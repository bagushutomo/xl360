/**
 * Initialization of XM Namespace
 */
(function() {
  var _global = this;
  
  if (_global.XM === undefined)
  {
    _global.XM = {};
  }
  
  XM.global = _global;
  XM.singleton = XM;

  /**
   * Copies all properties (or method) in config or defaults into receiver. Act as internal utility for class creation.
   *
   * @method
   * @param {object}  receiver The target object to receive the copy.
   * @param {object}  config   The object to be copied.
   * @param {object}  defaults If sepecified, the default object will be used instead of config.
   *
   * @return receiver The target object with new applied properties.
   */
  XM.apply = function(receiver, config, defaults) {
    if (defaults) {
      XM.apply(receiver, defaults);
    }
    
    if (receiver && config && config.constructor === Object) {
      if (receiver === null) {
        console.log('receiver null');
        receiver = {};
      }
      var i;
      for (i in config) {
        receiver[i] = config[i];
      }
    }
    
    return receiver;
  };
})();


XM.apply(XM, {
  emptyFn: function() {},

  /**
   * Validate the specified value by returning true if the specified value is Array. Otherwise, will return false.
   * @method
   * @static
   * @param {any} value Any value to validate
   * @return {Boolean}
   */
  isArray: function(value) {
    return value.constructor == Array;
  },
  /**
   * Validate the specified value by returning true if the specified value is Object. Otherwise, will return false.
   * @method
   * @static
   * @param {any} value Any value to validate
   * @return {Boolean}
   */
  isObject: function(value) {
    return value.constructor == Object;
  },
  /**
   * Validate the specified value by returning true if the specified value is Number. Otherwise, will return false.
   * @method
   * @static
   * @param {any} value Any value to validate
   * @return {Boolean}
   */
  isNumber: function(value) {
    return value.constructor == Number;
  },
  /**
   * Validate the specified value by returning true if the specified value is String. Otherwise, will return false.
   * @method
   * @static
   * @param {any} value Any value to validate
   * @return {Boolean}
   */
  isString: function(value) {
    if (value !== undefined) return value.constructor == String;
    else return false;
  },
  /**
   * Validate the specified value by returning true if the specified value is Boolean. Otherwise, will return false.
   * @method
   * @static
   * @param {any} value Any value to validate
   * @return {Boolean}
   */
  isBoolean: function(value) {
    return value.constructor == Boolean;
  },
  /**
   * Validate the specified value by returning true if the specified value is Date. Otherwise, will return false.
   * @method
   * @static
   * @param {any} value Any value to validate
   * @return {Boolean}
   */
  isDate: function(value) {
    return value.constructor == Date;
  },
  /**
   * Validate the specified value by returning true if the specified value is Function. Otherwise, will return false.
   * @method
   * @static
   * @param {any} value Any value to validate
   * @return {Boolean}
   */
  isFunction: function(value) {
    return value.constructor == Function;
  },
  /**
   * Validate the specified value by returning true if the specified value is null. Otherwise, will return false.
   * @method
   * @static
   * @param {any} value Any value to validate
   * @return {Boolean}
   */
  isNull: function(value) {
    return value === null;
  },
  /**
   * Validate the specified value by returning true if the specified value is undefined. Otherwise, will return false.
   * @method
   * @static
   * @param {any} value Any value to validate
   * @return {Boolean}
   */
  isUndefined: function(value) {
    return value === undefined;
  },
  /**
   * Validate the specified value by returning true if the specified value is empty. Otherwise, will return false. Empty value are:
   * <ul>
   * <li>null</li>
   * <li>undefined</li>
   * <li>an empty array</li>
   * <li>an empty string</li>
   * </ul>
   * @method
   * @static
   * @param {any} value Any value to validate.
   * @return {Boolean} The value of the validation.
   */
  isEmpty: function(value) {
    return (value === null) || (XM.isArray(value) && value.length === 0) || (XM.isUndefined(value) || (XM.isString(value) && value === ""));
  },

  /**
   * Will look whether the current DOM have a given element.
   * @method
   * @static
   * @param {string} value The ID of target element (without # mark).
   * @return {Boolean} The value of target element existence.
   */
  hasElement: function(value) {
    if (document.getElementById(value)) return true;
    else return false;
  }
});




(function(){

  XM.Object = {
    
    clone: function(item) {
    },
    
    /**
     * Merging specified object into {origin} object.
     * @method
     * @static
     * @param {object} origin A receiver object that receive the merged object.
     * @param {object} target An object that will be merged into {origin}.
     * @return {object} A new merged object.
     */
    mergeObject: function(origin) {
      for (var i = 1, j = arguments.length; i < j; i++){
        var obj = arguments[i];
        for (var key in obj) {
          if (XM.isObject(obj[key])) XM.Object.mergeObject(origin, key, obj[key]);
          else XM.Object.mergeValue(origin, key, obj[key]);
        }
      }
      return origin;
    },
    
    /**
     * Merging specified key-value pair into {origin} object.
     * @method
     * @static
     * @param {object}  origin  A receiver object that receive the merged object.
     * @param {string}  key     A string of named variable. This will be used as variable name in the merged object.
     * @param {any}     value   A named value. This will be used as value in the merged object.
     * @return {object} A new merged object.
     */
    mergeValue: function(origin, key, value) {
      if (XM.isString(key)) {
        if (XM.isObject(value) && XM.isObject(origin[key])) {
          XM.Object.mergeObject(origin[key], value);
        }
        else {
          origin[key] = value;
        }
      }
      else {
        origin[key] = value;
      }
      return origin;
    }
  };
})();