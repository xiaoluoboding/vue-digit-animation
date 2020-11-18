/*!
  * vue-digit-wheel v0.1.2
  * (c) 2020 xiaoluoboding
  * @license MIT
  */
var VueDigitWheel = (function (exports, vueDemi) {
	'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, basedir, module) {
		return module = {
			path: basedir,
			exports: {},
			require: function (path, base) {
				return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
			}
		}, fn(module, module.exports), module.exports;
	}

	function commonjsRequire () {
		throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
	}

	var numeral = createCommonjsModule(function (module) {
	/*! @preserve
	 * numeral.js
	 * version : 2.0.6
	 * author : Adam Draper
	 * license : MIT
	 * http://adamwdraper.github.com/Numeral-js/
	 */

	(function (global, factory) {
	    if ( module.exports) {
	        module.exports = factory();
	    } else {
	        global.numeral = factory();
	    }
	}(commonjsGlobal, function () {
	    /************************************
	        Variables
	    ************************************/

	    var numeral,
	        _,
	        VERSION = '2.0.6',
	        formats = {},
	        locales = {},
	        defaults = {
	            currentLocale: 'en',
	            zeroFormat: null,
	            nullFormat: null,
	            defaultFormat: '0,0',
	            scalePercentBy100: true
	        },
	        options = {
	            currentLocale: defaults.currentLocale,
	            zeroFormat: defaults.zeroFormat,
	            nullFormat: defaults.nullFormat,
	            defaultFormat: defaults.defaultFormat,
	            scalePercentBy100: defaults.scalePercentBy100
	        };


	    /************************************
	        Constructors
	    ************************************/

	    // Numeral prototype object
	    function Numeral(input, number) {
	        this._input = input;

	        this._value = number;
	    }

	    numeral = function(input) {
	        var value,
	            kind,
	            unformatFunction,
	            regexp;

	        if (numeral.isNumeral(input)) {
	            value = input.value();
	        } else if (input === 0 || typeof input === 'undefined') {
	            value = 0;
	        } else if (input === null || _.isNaN(input)) {
	            value = null;
	        } else if (typeof input === 'string') {
	            if (options.zeroFormat && input === options.zeroFormat) {
	                value = 0;
	            } else if (options.nullFormat && input === options.nullFormat || !input.replace(/[^0-9]+/g, '').length) {
	                value = null;
	            } else {
	                for (kind in formats) {
	                    regexp = typeof formats[kind].regexps.unformat === 'function' ? formats[kind].regexps.unformat() : formats[kind].regexps.unformat;

	                    if (regexp && input.match(regexp)) {
	                        unformatFunction = formats[kind].unformat;

	                        break;
	                    }
	                }

	                unformatFunction = unformatFunction || numeral._.stringToNumber;

	                value = unformatFunction(input);
	            }
	        } else {
	            value = Number(input)|| null;
	        }

	        return new Numeral(input, value);
	    };

	    // version number
	    numeral.version = VERSION;

	    // compare numeral object
	    numeral.isNumeral = function(obj) {
	        return obj instanceof Numeral;
	    };

	    // helper functions
	    numeral._ = _ = {
	        // formats numbers separators, decimals places, signs, abbreviations
	        numberToFormat: function(value, format, roundingFunction) {
	            var locale = locales[numeral.options.currentLocale],
	                negP = false,
	                optDec = false,
	                leadingCount = 0,
	                abbr = '',
	                trillion = 1000000000000,
	                billion = 1000000000,
	                million = 1000000,
	                thousand = 1000,
	                decimal = '',
	                neg = false,
	                abbrForce, // force abbreviation
	                abs,
	                int,
	                precision,
	                signed,
	                thousands,
	                output;

	            // make sure we never format a null value
	            value = value || 0;

	            abs = Math.abs(value);

	            // see if we should use parentheses for negative number or if we should prefix with a sign
	            // if both are present we default to parentheses
	            if (numeral._.includes(format, '(')) {
	                negP = true;
	                format = format.replace(/[\(|\)]/g, '');
	            } else if (numeral._.includes(format, '+') || numeral._.includes(format, '-')) {
	                signed = numeral._.includes(format, '+') ? format.indexOf('+') : value < 0 ? format.indexOf('-') : -1;
	                format = format.replace(/[\+|\-]/g, '');
	            }

	            // see if abbreviation is wanted
	            if (numeral._.includes(format, 'a')) {
	                abbrForce = format.match(/a(k|m|b|t)?/);

	                abbrForce = abbrForce ? abbrForce[1] : false;

	                // check for space before abbreviation
	                if (numeral._.includes(format, ' a')) {
	                    abbr = ' ';
	                }

	                format = format.replace(new RegExp(abbr + 'a[kmbt]?'), '');

	                if (abs >= trillion && !abbrForce || abbrForce === 't') {
	                    // trillion
	                    abbr += locale.abbreviations.trillion;
	                    value = value / trillion;
	                } else if (abs < trillion && abs >= billion && !abbrForce || abbrForce === 'b') {
	                    // billion
	                    abbr += locale.abbreviations.billion;
	                    value = value / billion;
	                } else if (abs < billion && abs >= million && !abbrForce || abbrForce === 'm') {
	                    // million
	                    abbr += locale.abbreviations.million;
	                    value = value / million;
	                } else if (abs < million && abs >= thousand && !abbrForce || abbrForce === 'k') {
	                    // thousand
	                    abbr += locale.abbreviations.thousand;
	                    value = value / thousand;
	                }
	            }

	            // check for optional decimals
	            if (numeral._.includes(format, '[.]')) {
	                optDec = true;
	                format = format.replace('[.]', '.');
	            }

	            // break number and format
	            int = value.toString().split('.')[0];
	            precision = format.split('.')[1];
	            thousands = format.indexOf(',');
	            leadingCount = (format.split('.')[0].split(',')[0].match(/0/g) || []).length;

	            if (precision) {
	                if (numeral._.includes(precision, '[')) {
	                    precision = precision.replace(']', '');
	                    precision = precision.split('[');
	                    decimal = numeral._.toFixed(value, (precision[0].length + precision[1].length), roundingFunction, precision[1].length);
	                } else {
	                    decimal = numeral._.toFixed(value, precision.length, roundingFunction);
	                }

	                int = decimal.split('.')[0];

	                if (numeral._.includes(decimal, '.')) {
	                    decimal = locale.delimiters.decimal + decimal.split('.')[1];
	                } else {
	                    decimal = '';
	                }

	                if (optDec && Number(decimal.slice(1)) === 0) {
	                    decimal = '';
	                }
	            } else {
	                int = numeral._.toFixed(value, 0, roundingFunction);
	            }

	            // check abbreviation again after rounding
	            if (abbr && !abbrForce && Number(int) >= 1000 && abbr !== locale.abbreviations.trillion) {
	                int = String(Number(int) / 1000);

	                switch (abbr) {
	                    case locale.abbreviations.thousand:
	                        abbr = locale.abbreviations.million;
	                        break;
	                    case locale.abbreviations.million:
	                        abbr = locale.abbreviations.billion;
	                        break;
	                    case locale.abbreviations.billion:
	                        abbr = locale.abbreviations.trillion;
	                        break;
	                }
	            }


	            // format number
	            if (numeral._.includes(int, '-')) {
	                int = int.slice(1);
	                neg = true;
	            }

	            if (int.length < leadingCount) {
	                for (var i = leadingCount - int.length; i > 0; i--) {
	                    int = '0' + int;
	                }
	            }

	            if (thousands > -1) {
	                int = int.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + locale.delimiters.thousands);
	            }

	            if (format.indexOf('.') === 0) {
	                int = '';
	            }

	            output = int + decimal + (abbr ? abbr : '');

	            if (negP) {
	                output = (negP && neg ? '(' : '') + output + (negP && neg ? ')' : '');
	            } else {
	                if (signed >= 0) {
	                    output = signed === 0 ? (neg ? '-' : '+') + output : output + (neg ? '-' : '+');
	                } else if (neg) {
	                    output = '-' + output;
	                }
	            }

	            return output;
	        },
	        // unformats numbers separators, decimals places, signs, abbreviations
	        stringToNumber: function(string) {
	            var locale = locales[options.currentLocale],
	                stringOriginal = string,
	                abbreviations = {
	                    thousand: 3,
	                    million: 6,
	                    billion: 9,
	                    trillion: 12
	                },
	                abbreviation,
	                value,
	                regexp;

	            if (options.zeroFormat && string === options.zeroFormat) {
	                value = 0;
	            } else if (options.nullFormat && string === options.nullFormat || !string.replace(/[^0-9]+/g, '').length) {
	                value = null;
	            } else {
	                value = 1;

	                if (locale.delimiters.decimal !== '.') {
	                    string = string.replace(/\./g, '').replace(locale.delimiters.decimal, '.');
	                }

	                for (abbreviation in abbreviations) {
	                    regexp = new RegExp('[^a-zA-Z]' + locale.abbreviations[abbreviation] + '(?:\\)|(\\' + locale.currency.symbol + ')?(?:\\))?)?$');

	                    if (stringOriginal.match(regexp)) {
	                        value *= Math.pow(10, abbreviations[abbreviation]);
	                        break;
	                    }
	                }

	                // check for negative number
	                value *= (string.split('-').length + Math.min(string.split('(').length - 1, string.split(')').length - 1)) % 2 ? 1 : -1;

	                // remove non numbers
	                string = string.replace(/[^0-9\.]+/g, '');

	                value *= Number(string);
	            }

	            return value;
	        },
	        isNaN: function(value) {
	            return typeof value === 'number' && isNaN(value);
	        },
	        includes: function(string, search) {
	            return string.indexOf(search) !== -1;
	        },
	        insert: function(string, subString, start) {
	            return string.slice(0, start) + subString + string.slice(start);
	        },
	        reduce: function(array, callback /*, initialValue*/) {
	            if (this === null) {
	                throw new TypeError('Array.prototype.reduce called on null or undefined');
	            }

	            if (typeof callback !== 'function') {
	                throw new TypeError(callback + ' is not a function');
	            }

	            var t = Object(array),
	                len = t.length >>> 0,
	                k = 0,
	                value;

	            if (arguments.length === 3) {
	                value = arguments[2];
	            } else {
	                while (k < len && !(k in t)) {
	                    k++;
	                }

	                if (k >= len) {
	                    throw new TypeError('Reduce of empty array with no initial value');
	                }

	                value = t[k++];
	            }
	            for (; k < len; k++) {
	                if (k in t) {
	                    value = callback(value, t[k], k, t);
	                }
	            }
	            return value;
	        },
	        /**
	         * Computes the multiplier necessary to make x >= 1,
	         * effectively eliminating miscalculations caused by
	         * finite precision.
	         */
	        multiplier: function (x) {
	            var parts = x.toString().split('.');

	            return parts.length < 2 ? 1 : Math.pow(10, parts[1].length);
	        },
	        /**
	         * Given a variable number of arguments, returns the maximum
	         * multiplier that must be used to normalize an operation involving
	         * all of them.
	         */
	        correctionFactor: function () {
	            var args = Array.prototype.slice.call(arguments);

	            return args.reduce(function(accum, next) {
	                var mn = _.multiplier(next);
	                return accum > mn ? accum : mn;
	            }, 1);
	        },
	        /**
	         * Implementation of toFixed() that treats floats more like decimals
	         *
	         * Fixes binary rounding issues (eg. (0.615).toFixed(2) === '0.61') that present
	         * problems for accounting- and finance-related software.
	         */
	        toFixed: function(value, maxDecimals, roundingFunction, optionals) {
	            var splitValue = value.toString().split('.'),
	                minDecimals = maxDecimals - (optionals || 0),
	                boundedPrecision,
	                optionalsRegExp,
	                power,
	                output;

	            // Use the smallest precision value possible to avoid errors from floating point representation
	            if (splitValue.length === 2) {
	              boundedPrecision = Math.min(Math.max(splitValue[1].length, minDecimals), maxDecimals);
	            } else {
	              boundedPrecision = minDecimals;
	            }

	            power = Math.pow(10, boundedPrecision);

	            // Multiply up by precision, round accurately, then divide and use native toFixed():
	            output = (roundingFunction(value + 'e+' + boundedPrecision) / power).toFixed(boundedPrecision);

	            if (optionals > maxDecimals - boundedPrecision) {
	                optionalsRegExp = new RegExp('\\.?0{1,' + (optionals - (maxDecimals - boundedPrecision)) + '}$');
	                output = output.replace(optionalsRegExp, '');
	            }

	            return output;
	        }
	    };

	    // avaliable options
	    numeral.options = options;

	    // avaliable formats
	    numeral.formats = formats;

	    // avaliable formats
	    numeral.locales = locales;

	    // This function sets the current locale.  If
	    // no arguments are passed in, it will simply return the current global
	    // locale key.
	    numeral.locale = function(key) {
	        if (key) {
	            options.currentLocale = key.toLowerCase();
	        }

	        return options.currentLocale;
	    };

	    // This function provides access to the loaded locale data.  If
	    // no arguments are passed in, it will simply return the current
	    // global locale object.
	    numeral.localeData = function(key) {
	        if (!key) {
	            return locales[options.currentLocale];
	        }

	        key = key.toLowerCase();

	        if (!locales[key]) {
	            throw new Error('Unknown locale : ' + key);
	        }

	        return locales[key];
	    };

	    numeral.reset = function() {
	        for (var property in defaults) {
	            options[property] = defaults[property];
	        }
	    };

	    numeral.zeroFormat = function(format) {
	        options.zeroFormat = typeof(format) === 'string' ? format : null;
	    };

	    numeral.nullFormat = function (format) {
	        options.nullFormat = typeof(format) === 'string' ? format : null;
	    };

	    numeral.defaultFormat = function(format) {
	        options.defaultFormat = typeof(format) === 'string' ? format : '0.0';
	    };

	    numeral.register = function(type, name, format) {
	        name = name.toLowerCase();

	        if (this[type + 's'][name]) {
	            throw new TypeError(name + ' ' + type + ' already registered.');
	        }

	        this[type + 's'][name] = format;

	        return format;
	    };


	    numeral.validate = function(val, culture) {
	        var _decimalSep,
	            _thousandSep,
	            _currSymbol,
	            _valArray,
	            _abbrObj,
	            _thousandRegEx,
	            localeData,
	            temp;

	        //coerce val to string
	        if (typeof val !== 'string') {
	            val += '';

	            if (console.warn) {
	                console.warn('Numeral.js: Value is not string. It has been co-erced to: ', val);
	            }
	        }

	        //trim whitespaces from either sides
	        val = val.trim();

	        //if val is just digits return true
	        if (!!val.match(/^\d+$/)) {
	            return true;
	        }

	        //if val is empty return false
	        if (val === '') {
	            return false;
	        }

	        //get the decimal and thousands separator from numeral.localeData
	        try {
	            //check if the culture is understood by numeral. if not, default it to current locale
	            localeData = numeral.localeData(culture);
	        } catch (e) {
	            localeData = numeral.localeData(numeral.locale());
	        }

	        //setup the delimiters and currency symbol based on culture/locale
	        _currSymbol = localeData.currency.symbol;
	        _abbrObj = localeData.abbreviations;
	        _decimalSep = localeData.delimiters.decimal;
	        if (localeData.delimiters.thousands === '.') {
	            _thousandSep = '\\.';
	        } else {
	            _thousandSep = localeData.delimiters.thousands;
	        }

	        // validating currency symbol
	        temp = val.match(/^[^\d]+/);
	        if (temp !== null) {
	            val = val.substr(1);
	            if (temp[0] !== _currSymbol) {
	                return false;
	            }
	        }

	        //validating abbreviation symbol
	        temp = val.match(/[^\d]+$/);
	        if (temp !== null) {
	            val = val.slice(0, -1);
	            if (temp[0] !== _abbrObj.thousand && temp[0] !== _abbrObj.million && temp[0] !== _abbrObj.billion && temp[0] !== _abbrObj.trillion) {
	                return false;
	            }
	        }

	        _thousandRegEx = new RegExp(_thousandSep + '{2}');

	        if (!val.match(/[^\d.,]/g)) {
	            _valArray = val.split(_decimalSep);
	            if (_valArray.length > 2) {
	                return false;
	            } else {
	                if (_valArray.length < 2) {
	                    return ( !! _valArray[0].match(/^\d+.*\d$/) && !_valArray[0].match(_thousandRegEx));
	                } else {
	                    if (_valArray[0].length === 1) {
	                        return ( !! _valArray[0].match(/^\d+$/) && !_valArray[0].match(_thousandRegEx) && !! _valArray[1].match(/^\d+$/));
	                    } else {
	                        return ( !! _valArray[0].match(/^\d+.*\d$/) && !_valArray[0].match(_thousandRegEx) && !! _valArray[1].match(/^\d+$/));
	                    }
	                }
	            }
	        }

	        return false;
	    };


	    /************************************
	        Numeral Prototype
	    ************************************/

	    numeral.fn = Numeral.prototype = {
	        clone: function() {
	            return numeral(this);
	        },
	        format: function(inputString, roundingFunction) {
	            var value = this._value,
	                format = inputString || options.defaultFormat,
	                kind,
	                output,
	                formatFunction;

	            // make sure we have a roundingFunction
	            roundingFunction = roundingFunction || Math.round;

	            // format based on value
	            if (value === 0 && options.zeroFormat !== null) {
	                output = options.zeroFormat;
	            } else if (value === null && options.nullFormat !== null) {
	                output = options.nullFormat;
	            } else {
	                for (kind in formats) {
	                    if (format.match(formats[kind].regexps.format)) {
	                        formatFunction = formats[kind].format;

	                        break;
	                    }
	                }

	                formatFunction = formatFunction || numeral._.numberToFormat;

	                output = formatFunction(value, format, roundingFunction);
	            }

	            return output;
	        },
	        value: function() {
	            return this._value;
	        },
	        input: function() {
	            return this._input;
	        },
	        set: function(value) {
	            this._value = Number(value);

	            return this;
	        },
	        add: function(value) {
	            var corrFactor = _.correctionFactor.call(null, this._value, value);

	            function cback(accum, curr, currI, O) {
	                return accum + Math.round(corrFactor * curr);
	            }

	            this._value = _.reduce([this._value, value], cback, 0) / corrFactor;

	            return this;
	        },
	        subtract: function(value) {
	            var corrFactor = _.correctionFactor.call(null, this._value, value);

	            function cback(accum, curr, currI, O) {
	                return accum - Math.round(corrFactor * curr);
	            }

	            this._value = _.reduce([value], cback, Math.round(this._value * corrFactor)) / corrFactor;

	            return this;
	        },
	        multiply: function(value) {
	            function cback(accum, curr, currI, O) {
	                var corrFactor = _.correctionFactor(accum, curr);
	                return Math.round(accum * corrFactor) * Math.round(curr * corrFactor) / Math.round(corrFactor * corrFactor);
	            }

	            this._value = _.reduce([this._value, value], cback, 1);

	            return this;
	        },
	        divide: function(value) {
	            function cback(accum, curr, currI, O) {
	                var corrFactor = _.correctionFactor(accum, curr);
	                return Math.round(accum * corrFactor) / Math.round(curr * corrFactor);
	            }

	            this._value = _.reduce([this._value, value], cback);

	            return this;
	        },
	        difference: function(value) {
	            return Math.abs(numeral(this._value).subtract(value).value());
	        }
	    };

	    /************************************
	        Default Locale && Format
	    ************************************/

	    numeral.register('locale', 'en', {
	        delimiters: {
	            thousands: ',',
	            decimal: '.'
	        },
	        abbreviations: {
	            thousand: 'k',
	            million: 'm',
	            billion: 'b',
	            trillion: 't'
	        },
	        ordinal: function(number) {
	            var b = number % 10;
	            return (~~(number % 100 / 10) === 1) ? 'th' :
	                (b === 1) ? 'st' :
	                (b === 2) ? 'nd' :
	                (b === 3) ? 'rd' : 'th';
	        },
	        currency: {
	            symbol: '$'
	        }
	    });

	    

	(function() {
	        numeral.register('format', 'bps', {
	            regexps: {
	                format: /(BPS)/,
	                unformat: /(BPS)/
	            },
	            format: function(value, format, roundingFunction) {
	                var space = numeral._.includes(format, ' BPS') ? ' ' : '',
	                    output;

	                value = value * 10000;

	                // check for space before BPS
	                format = format.replace(/\s?BPS/, '');

	                output = numeral._.numberToFormat(value, format, roundingFunction);

	                if (numeral._.includes(output, ')')) {
	                    output = output.split('');

	                    output.splice(-1, 0, space + 'BPS');

	                    output = output.join('');
	                } else {
	                    output = output + space + 'BPS';
	                }

	                return output;
	            },
	            unformat: function(string) {
	                return +(numeral._.stringToNumber(string) * 0.0001).toFixed(15);
	            }
	        });
	})();


	(function() {
	        var decimal = {
	            base: 1000,
	            suffixes: ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
	        },
	        binary = {
	            base: 1024,
	            suffixes: ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']
	        };

	    var allSuffixes =  decimal.suffixes.concat(binary.suffixes.filter(function (item) {
	            return decimal.suffixes.indexOf(item) < 0;
	        }));
	        var unformatRegex = allSuffixes.join('|');
	        // Allow support for BPS (http://www.investopedia.com/terms/b/basispoint.asp)
	        unformatRegex = '(' + unformatRegex.replace('B', 'B(?!PS)') + ')';

	    numeral.register('format', 'bytes', {
	        regexps: {
	            format: /([0\s]i?b)/,
	            unformat: new RegExp(unformatRegex)
	        },
	        format: function(value, format, roundingFunction) {
	            var output,
	                bytes = numeral._.includes(format, 'ib') ? binary : decimal,
	                suffix = numeral._.includes(format, ' b') || numeral._.includes(format, ' ib') ? ' ' : '',
	                power,
	                min,
	                max;

	            // check for space before
	            format = format.replace(/\s?i?b/, '');

	            for (power = 0; power <= bytes.suffixes.length; power++) {
	                min = Math.pow(bytes.base, power);
	                max = Math.pow(bytes.base, power + 1);

	                if (value === null || value === 0 || value >= min && value < max) {
	                    suffix += bytes.suffixes[power];

	                    if (min > 0) {
	                        value = value / min;
	                    }

	                    break;
	                }
	            }

	            output = numeral._.numberToFormat(value, format, roundingFunction);

	            return output + suffix;
	        },
	        unformat: function(string) {
	            var value = numeral._.stringToNumber(string),
	                power,
	                bytesMultiplier;

	            if (value) {
	                for (power = decimal.suffixes.length - 1; power >= 0; power--) {
	                    if (numeral._.includes(string, decimal.suffixes[power])) {
	                        bytesMultiplier = Math.pow(decimal.base, power);

	                        break;
	                    }

	                    if (numeral._.includes(string, binary.suffixes[power])) {
	                        bytesMultiplier = Math.pow(binary.base, power);

	                        break;
	                    }
	                }

	                value *= (bytesMultiplier || 1);
	            }

	            return value;
	        }
	    });
	})();


	(function() {
	        numeral.register('format', 'currency', {
	        regexps: {
	            format: /(\$)/
	        },
	        format: function(value, format, roundingFunction) {
	            var locale = numeral.locales[numeral.options.currentLocale],
	                symbols = {
	                    before: format.match(/^([\+|\-|\(|\s|\$]*)/)[0],
	                    after: format.match(/([\+|\-|\)|\s|\$]*)$/)[0]
	                },
	                output,
	                symbol,
	                i;

	            // strip format of spaces and $
	            format = format.replace(/\s?\$\s?/, '');

	            // format the number
	            output = numeral._.numberToFormat(value, format, roundingFunction);

	            // update the before and after based on value
	            if (value >= 0) {
	                symbols.before = symbols.before.replace(/[\-\(]/, '');
	                symbols.after = symbols.after.replace(/[\-\)]/, '');
	            } else if (value < 0 && (!numeral._.includes(symbols.before, '-') && !numeral._.includes(symbols.before, '('))) {
	                symbols.before = '-' + symbols.before;
	            }

	            // loop through each before symbol
	            for (i = 0; i < symbols.before.length; i++) {
	                symbol = symbols.before[i];

	                switch (symbol) {
	                    case '$':
	                        output = numeral._.insert(output, locale.currency.symbol, i);
	                        break;
	                    case ' ':
	                        output = numeral._.insert(output, ' ', i + locale.currency.symbol.length - 1);
	                        break;
	                }
	            }

	            // loop through each after symbol
	            for (i = symbols.after.length - 1; i >= 0; i--) {
	                symbol = symbols.after[i];

	                switch (symbol) {
	                    case '$':
	                        output = i === symbols.after.length - 1 ? output + locale.currency.symbol : numeral._.insert(output, locale.currency.symbol, -(symbols.after.length - (1 + i)));
	                        break;
	                    case ' ':
	                        output = i === symbols.after.length - 1 ? output + ' ' : numeral._.insert(output, ' ', -(symbols.after.length - (1 + i) + locale.currency.symbol.length - 1));
	                        break;
	                }
	            }


	            return output;
	        }
	    });
	})();


	(function() {
	        numeral.register('format', 'exponential', {
	        regexps: {
	            format: /(e\+|e-)/,
	            unformat: /(e\+|e-)/
	        },
	        format: function(value, format, roundingFunction) {
	            var output,
	                exponential = typeof value === 'number' && !numeral._.isNaN(value) ? value.toExponential() : '0e+0',
	                parts = exponential.split('e');

	            format = format.replace(/e[\+|\-]{1}0/, '');

	            output = numeral._.numberToFormat(Number(parts[0]), format, roundingFunction);

	            return output + 'e' + parts[1];
	        },
	        unformat: function(string) {
	            var parts = numeral._.includes(string, 'e+') ? string.split('e+') : string.split('e-'),
	                value = Number(parts[0]),
	                power = Number(parts[1]);

	            power = numeral._.includes(string, 'e-') ? power *= -1 : power;

	            function cback(accum, curr, currI, O) {
	                var corrFactor = numeral._.correctionFactor(accum, curr),
	                    num = (accum * corrFactor) * (curr * corrFactor) / (corrFactor * corrFactor);
	                return num;
	            }

	            return numeral._.reduce([value, Math.pow(10, power)], cback, 1);
	        }
	    });
	})();


	(function() {
	        numeral.register('format', 'ordinal', {
	        regexps: {
	            format: /(o)/
	        },
	        format: function(value, format, roundingFunction) {
	            var locale = numeral.locales[numeral.options.currentLocale],
	                output,
	                ordinal = numeral._.includes(format, ' o') ? ' ' : '';

	            // check for space before
	            format = format.replace(/\s?o/, '');

	            ordinal += locale.ordinal(value);

	            output = numeral._.numberToFormat(value, format, roundingFunction);

	            return output + ordinal;
	        }
	    });
	})();


	(function() {
	        numeral.register('format', 'percentage', {
	        regexps: {
	            format: /(%)/,
	            unformat: /(%)/
	        },
	        format: function(value, format, roundingFunction) {
	            var space = numeral._.includes(format, ' %') ? ' ' : '',
	                output;

	            if (numeral.options.scalePercentBy100) {
	                value = value * 100;
	            }

	            // check for space before %
	            format = format.replace(/\s?\%/, '');

	            output = numeral._.numberToFormat(value, format, roundingFunction);

	            if (numeral._.includes(output, ')')) {
	                output = output.split('');

	                output.splice(-1, 0, space + '%');

	                output = output.join('');
	            } else {
	                output = output + space + '%';
	            }

	            return output;
	        },
	        unformat: function(string) {
	            var number = numeral._.stringToNumber(string);
	            if (numeral.options.scalePercentBy100) {
	                return number * 0.01;
	            }
	            return number;
	        }
	    });
	})();


	(function() {
	        numeral.register('format', 'time', {
	        regexps: {
	            format: /(:)/,
	            unformat: /(:)/
	        },
	        format: function(value, format, roundingFunction) {
	            var hours = Math.floor(value / 60 / 60),
	                minutes = Math.floor((value - (hours * 60 * 60)) / 60),
	                seconds = Math.round(value - (hours * 60 * 60) - (minutes * 60));

	            return hours + ':' + (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
	        },
	        unformat: function(string) {
	            var timeArray = string.split(':'),
	                seconds = 0;

	            // turn hours and minutes into seconds and add them all up
	            if (timeArray.length === 3) {
	                // hours
	                seconds = seconds + (Number(timeArray[0]) * 60 * 60);
	                // minutes
	                seconds = seconds + (Number(timeArray[1]) * 60);
	                // seconds
	                seconds = seconds + Number(timeArray[2]);
	            } else if (timeArray.length === 2) {
	                // minutes
	                seconds = seconds + (Number(timeArray[0]) * 60);
	                // seconds
	                seconds = seconds + Number(timeArray[1]);
	            }
	            return Number(seconds);
	        }
	    });
	})();

	return numeral;
	}));
	});

	numeral.register('format', 'zh-number', {
	    regexps: {
	        format: /(zh)/,
	        unformat: /(zh)/
	    },
	    format: function (value, format) {
	        // check if has the space
	        const space = numeral._.includes(format, ' zh') ? ' ' : '';
	        // check for space before zh
	        format = format.replace(/\s?zh/, '');
	        const prevFormat = format.split('zh')[0];
	        const cnNumberFormat = (val) => {
	            if (isNaN(+val))
	                return val;
	            const symbolMap = [
	                { value: 1e8, symbol: '亿' },
	                { value: 1e4, symbol: '万' },
	                { value: 1e3, symbol: '千' }
	            ];
	            for (let i = 0; i < symbolMap.length; i++) {
	                if (Math.abs(val) >= symbolMap[i].value) {
	                    return numeral(val / symbolMap[i].value).format(prevFormat) + space + symbolMap[i].symbol;
	                }
	            }
	            return val.toString();
	        };
	        return cnNumberFormat(value);
	    },
	    unformat: function (string) {
	        return numeral._.stringToNumber(string) * 0.01;
	    }
	});

	numeral.register('format', 'colonTime', {
	    regexps: {
	        format: /(HHmmss)/,
	        unformat: /(HHmmss)/
	    },
	    format: function (value) {
	        // console.log(format)
	        return new Date(value).toTimeString().slice(0, 8);
	    },
	    unformat: function (string) {
	        const timeArray = string.split(':');
	        let seconds = 0;
	        // turn hours and minutes into seconds and add them all up
	        if (timeArray.length === 3) {
	            // hours
	            seconds = seconds + (Number(timeArray[0]) * 60 * 60);
	            // minutes
	            seconds = seconds + (Number(timeArray[1]) * 60);
	            // seconds
	            seconds = seconds + Number(timeArray[2]);
	        }
	        else if (timeArray.length === 2) {
	            // minutes
	            seconds = seconds + (Number(timeArray[0]) * 60);
	            // seconds
	            seconds = seconds + Number(timeArray[1]);
	        }
	        return Number(seconds);
	    }
	});

	numeral.register('format', 'localDate', {
	    regexps: {
	        format: /YYYY(\/)MM(\/)DD/,
	        unformat: /YYYY(\/)MM(\/)DD/
	    },
	    format: function (value) {
	        // console.log(format)
	        return new Date(value).toLocaleDateString();
	    },
	    unformat: function (string) {
	        const timeArray = string.split('/');
	        let seconds = 0;
	        // turn hours and minutes into seconds and add them all up
	        if (timeArray.length === 3) {
	            // hours
	            seconds = seconds + (Number(timeArray[0]) * 60 * 60);
	            // minutes
	            seconds = seconds + (Number(timeArray[1]) * 60);
	            // seconds
	            seconds = seconds + Number(timeArray[2]);
	        }
	        else if (timeArray.length === 2) {
	            // minutes
	            seconds = seconds + (Number(timeArray[0]) * 60);
	            // seconds
	            seconds = seconds + Number(timeArray[1]);
	        }
	        return Number(seconds);
	    }
	});

	// Linked Node
	class Node {
	    constructor(element) {
	        this.element = element;
	        this.next = {};
	    }
	}
	// Linked List
	class LinkedList {
	    constructor() {
	        this.head = new Node('head');
	        this.head.next = this.head;
	    }
	    remove(item) {
	        const prevNode = this.findPrevious(item);
	        if (!(prevNode.next == null)) {
	            prevNode.next = prevNode.next.next;
	        }
	    }
	    findPrevious(item) {
	        let currNode = this.head;
	        while (!(currNode.next == null) &&
	            !(currNode.next.element === 'head') &&
	            currNode.next.element !== item) {
	            currNode = currNode.next;
	        }
	        return currNode;
	    }
	    getCircleMiddle(item) {
	        let currNode = this.find(item);
	        // console.log(currNode)
	        const prevArr = [];
	        const nextArr = [];
	        for (let i = 0; i < 5; i++) {
	            currNode = currNode.next;
	            if (currNode.next.element === 'head') {
	                currNode = currNode.next.next;
	            }
	            nextArr.push(currNode.element);
	        }
	        for (let i = 0; i < 6; i++) {
	            prevArr.push(currNode.element);
	            currNode = currNode.next;
	            if (currNode.next.element === 'head') {
	                currNode = currNode.next.next;
	            }
	        }
	        // console.log(JSON.stringify(prevArr))
	        // console.log(JSON.stringify(nextArr))
	        return prevArr.concat(nextArr);
	    }
	    display() {
	        let currNode = this.head;
	        while (!(currNode.next == null) && !(currNode.next.element === 'head')) {
	            console.log(currNode.next.element);
	            // console.log(currNode.next)
	            currNode = currNode.next;
	        }
	    }
	    find(element) {
	        let currNode = this.head;
	        while (currNode.element !== element) {
	            currNode = currNode.next;
	        }
	        // console.log(currNode)
	        return currNode;
	    }
	    insert(newElement, item) {
	        const newNode = new Node(newElement);
	        const current = this.find(item);
	        if (current) {
	            newNode.next = current.next;
	            current.next = newNode;
	        }
	        return this;
	    }
	}

	const easingMap = {
	    'Cubic.easeInOut': 'cubic-bezier(0.65, 0, 0.35, 1)',
	    'Cubic.easeIn': 'cubic-bezier(0.32, 0, 0.67, 0)',
	    'Cubic.easeOut': 'cubic-bezier(0.33, 1, 0.68, 1)',
	    'Sine.easeIn': 'cubic-bezier(0.12, 0, 0.39, 0)',
	    'Sine.easeOut': 'cubic-bezier(0.61, 1, 0.88, 1)',
	    'Sine.easeInOut': 'cubic-bezier(0.37, 0, 0.63, 1)',
	    'Quad.easeIn': 'cubic-bezier(0.11, 0, 0.5, 0)',
	    'Quad.easeOut': 'cubic-bezier(0.5, 1, 0.89, 1)',
	    'Quad.easeInOut': 'cubic-bezier(0.45, 0, 0.55, 1)',
	    'Quart.easeIn': 'cubic-bezier(0.5, 0, 0.75, 0)',
	    'Quart.easeOut': 'cubic-bezier(0.25, 1, 0.5, 1)',
	    'Quart.easeInOut': 'cubic-bezier(0.76, 0, 0.24, 1)',
	    'Quint.easeIn': 'cubic-bezier(0.64, 0, 0.78, 0)',
	    'Quint.easeOut': 'cubic-bezier(0.22, 1, 0.36, 1)',
	    'Quint.easeInOut': 'cubic-bezier(0.83, 0, 0.17, 1)',
	    'Expo.easeIn': 'cubic-bezier(0.7, 0, 0.84, 0)',
	    'Expo.easeOut': 'cubic-bezier(0.16, 1, 0.3, 1)',
	    'Expo.easeInOut': 'cubic-bezier(0.87, 0, 0.13, 1)',
	    'Circ.easeIn': 'cubic-bezier(0.55, 0, 1, 0.45)',
	    'Circ.easeOut': 'cubic-bezier(0, 0.55, 0.45, 1)',
	    'Circ.easeInOut': 'cubic-bezier(0.85, 0, 0.15, 1)',
	    'Back.easeIn': 'cubic-bezier(0.36, 0, 0.66, -0.56)',
	    'Back.easeOut': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
	    'Back.easeInOut': 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
	    Linear: 'linear',
	    Ease: 'ease'
	};
	const fontSizePreset = {
	    xs: '0.75rem',
	    sm: '0.875rem',
	    base: '1rem',
	    lg: '1.125rem',
	    xl: '1.25rem',
	    '2xl': '1.5rem',
	    '3xl': '1.875rem',
	    '4xl': '2.25rem',
	    '5xl': '3rem',
	    '6xl': '4rem'
	};
	const circleLinkedDigit = new LinkedList();
	const UUIDGenerator = () => (String(1e7) + -1e11).replace(/[018]/g, (c) => (Number(c) ^
	    (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (Number(c) / 4)))).toString(16));
	circleLinkedDigit
	    .insert('0', 'head')
	    .insert('9', '0')
	    .insert('8', '9')
	    .insert('7', '8')
	    .insert('6', '7')
	    .insert('5', '6')
	    .insert('4', '5')
	    .insert('3', '4')
	    .insert('2', '3')
	    .insert('1', '2')
	    .insert('0', '1');

	const DIGIT_DEGREE = 360 / 10;
	var script = vueDemi.defineComponent({
	    name: 'DigitWheel',
	    props: {
	        digit: {
	            type: [String, Number],
	            default: ''
	        },
	        index: {
	            type: Number,
	            default: 0
	        },
	        size: {
	            type: String,
	            default: 'base'
	        },
	        animation: {
	            type: String,
	            default: 'wheel'
	        },
	        duration: {
	            type: Number,
	            default: 1000
	        },
	        stagger: {
	            type: Boolean,
	            default: false
	        },
	        useEase: {
	            type: String,
	            default: 'Ease'
	        },
	        isGroup: {
	            type: Boolean,
	            default: false
	        }
	    },
	    data: vm => ({
	        uuid: UUIDGenerator(),
	        digitHeight: 0,
	        showRange: [vm.digit]
	    }),
	    computed: {
	        digitWheel() {
	            const digitValue = Number(this.digit);
	            this.getDigitHeight();
	            return new Array(10).fill(0).map((item, index) => {
	                const inRadius = (this.digitHeight / 2) / (this.getTanFromDegrees(DIGIT_DEGREE / 2));
	                // console.log(this.digitHeight, inRadius)
	                const isBackDigit = (digitValue < 5 ? digitValue + 5 : digitValue - 5) === index;
	                const isHide = !this.showRange.includes(index);
	                return {
	                    value: index,
	                    style: {
	                        transform: `rotateX(${0 - index * DIGIT_DEGREE}deg) translateZ(${inRadius}px)`,
	                        visibility: (isBackDigit || isHide) ? 'hidden' : 'visible'
	                    }
	                };
	            });
	        },
	        digitWheelStyle() {
	            const transDuration = `${this.duration + (this.stagger ? 200 : 0) * this.index}ms`;
	            const transEaseFunction = easingMap[this.useEase] || 'ease';
	            return {
	                transform: `rotateX(${Number(this.digit) * DIGIT_DEGREE - 360}deg)`,
	                transition: `${transDuration} ${transEaseFunction}`
	            };
	        },
	        textStyle() {
	            const sizePreset = Object.prototype.hasOwnProperty.call(fontSizePreset, this.size)
	                ? fontSizePreset[this.size]
	                : this.size;
	            return this.isGroup ? {} : { fontSize: sizePreset };
	        }
	    },
	    watch: {
	        digit(oldVal, newVal) {
	            const digits = new Array(10).fill(0).map((item, index) => index);
	            const minVal = oldVal < newVal ? oldVal : newVal;
	            const maxVal = oldVal < newVal ? newVal : oldVal;
	            this.showRange = digits.slice(minVal, maxVal + 1);
	        }
	    },
	    mounted() {
	        const dwEl = document.getElementById(this.uuid);
	        if (dwEl) {
	            const compStyles = window.getComputedStyle(dwEl);
	            const digitFontSize = compStyles.getPropertyValue('font-size');
	            this.digitHeight = Number(digitFontSize.replace('px', ''));
	        }
	        this.showRange.push(Number(this.digit));
	    },
	    methods: {
	        isNumber(val) {
	            return typeof val === 'number' && !isNaN(val);
	        },
	        isDigit(val) {
	            return this.isNumber(parseInt(val, 10));
	        },
	        getTanFromDegrees(degrees) {
	            return Math.tan((degrees * Math.PI) / 180);
	        },
	        ensureDigitClass(val) {
	            const isLetter = /[a-zA-Z]/;
	            const isChinese = /[\u4E00-\u9FA5]/;
	            const isDigit = /\d/;
	            const isPercentage = /%/;
	            if (isLetter.test(val))
	                return 'is-letter';
	            if (isChinese.test(val))
	                return 'is-chinese';
	            if (isPercentage.test(val))
	                return 'is-percentage';
	            if (isDigit.test(val))
	                return 'is-digit';
	            return 'is-symbol';
	        },
	        getDigitHeight() {
	            const dwEl = document.getElementById(this.uuid);
	            if (dwEl) {
	                const compStyles = window.getComputedStyle(dwEl);
	                const digitFontSize = compStyles.getPropertyValue('font-size');
	                this.digitHeight = Number(digitFontSize.replace('px', ''));
	            }
	        }
	    }
	});

	/**
	 * Make a map and return a function for checking if a key
	 * is in that map.
	 * IMPORTANT: all calls of this function must be prefixed with
	 * \/\*#\_\_PURE\_\_\*\/
	 * So that rollup can tree-shake them if necessary.
	 */
	function makeMap(str, expectsLowerCase) {
	    const map = Object.create(null);
	    const list = str.split(',');
	    for (let i = 0; i < list.length; i++) {
	        map[list[i]] = true;
	    }
	    return expectsLowerCase ? val => !!map[val.toLowerCase()] : val => !!map[val];
	}

	const GLOBALS_WHITE_LISTED = 'Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,' +
	    'decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,' +
	    'Object,Boolean,String,RegExp,Map,Set,JSON,Intl';
	const isGloballyWhitelisted = /*#__PURE__*/ makeMap(GLOBALS_WHITE_LISTED);

	function normalizeStyle(value) {
	    if (isArray(value)) {
	        const res = {};
	        for (let i = 0; i < value.length; i++) {
	            const item = value[i];
	            const normalized = normalizeStyle(isString(item) ? parseStringStyle(item) : item);
	            if (normalized) {
	                for (const key in normalized) {
	                    res[key] = normalized[key];
	                }
	            }
	        }
	        return res;
	    }
	    else if (isObject(value)) {
	        return value;
	    }
	}
	const listDelimiterRE = /;(?![^(]*\))/g;
	const propertyDelimiterRE = /:(.+)/;
	function parseStringStyle(cssText) {
	    const ret = {};
	    cssText.split(listDelimiterRE).forEach(item => {
	        if (item) {
	            const tmp = item.split(propertyDelimiterRE);
	            tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
	        }
	    });
	    return ret;
	}
	function normalizeClass(value) {
	    let res = '';
	    if (isString(value)) {
	        res = value;
	    }
	    else if (isArray(value)) {
	        for (let i = 0; i < value.length; i++) {
	            res += normalizeClass(value[i]) + ' ';
	        }
	    }
	    else if (isObject(value)) {
	        for (const name in value) {
	            if (value[name]) {
	                res += name + ' ';
	            }
	        }
	    }
	    return res.trim();
	}

	/**
	 * For converting {{ interpolation }} values to displayed strings.
	 * @private
	 */
	const toDisplayString = (val) => {
	    return val == null
	        ? ''
	        : isObject(val)
	            ? JSON.stringify(val, replacer, 2)
	            : String(val);
	};
	const replacer = (_key, val) => {
	    if (isMap(val)) {
	        return {
	            [`Map(${val.size})`]: [...val.entries()].reduce((entries, [key, val]) => {
	                entries[`${key} =>`] = val;
	                return entries;
	            }, {})
	        };
	    }
	    else if (isSet(val)) {
	        return {
	            [`Set(${val.size})`]: [...val.values()]
	        };
	    }
	    else if (isObject(val) && !isArray(val) && !isPlainObject(val)) {
	        return String(val);
	    }
	    return val;
	};
	const EMPTY_OBJ = (process.env.NODE_ENV !== 'production')
	    ? Object.freeze({})
	    : {};
	const EMPTY_ARR = (process.env.NODE_ENV !== 'production') ? Object.freeze([]) : [];
	const NOOP = () => { };
	const onRE = /^on[^a-z]/;
	const isOn = (key) => onRE.test(key);
	const extend = Object.assign;
	const remove = (arr, el) => {
	    const i = arr.indexOf(el);
	    if (i > -1) {
	        arr.splice(i, 1);
	    }
	};
	const hasOwnProperty = Object.prototype.hasOwnProperty;
	const hasOwn = (val, key) => hasOwnProperty.call(val, key);
	const isArray = Array.isArray;
	const isMap = (val) => toTypeString(val) === '[object Map]';
	const isSet = (val) => toTypeString(val) === '[object Set]';
	const isFunction = (val) => typeof val === 'function';
	const isString = (val) => typeof val === 'string';
	const isSymbol = (val) => typeof val === 'symbol';
	const isObject = (val) => val !== null && typeof val === 'object';
	const isPromise = (val) => {
	    return isObject(val) && isFunction(val.then) && isFunction(val.catch);
	};
	const objectToString = Object.prototype.toString;
	const toTypeString = (value) => objectToString.call(value);
	const toRawType = (value) => {
	    // extract "RawType" from strings like "[object RawType]"
	    return toTypeString(value).slice(8, -1);
	};
	const isPlainObject = (val) => toTypeString(val) === '[object Object]';
	const isIntegerKey = (key) => isString(key) &&
	    key !== 'NaN' &&
	    key[0] !== '-' &&
	    '' + parseInt(key, 10) === key;
	const cacheStringFunction = (fn) => {
	    const cache = Object.create(null);
	    return ((str) => {
	        const hit = cache[str];
	        return hit || (cache[str] = fn(str));
	    });
	};
	const camelizeRE = /-(\w)/g;
	/**
	 * @private
	 */
	const camelize = cacheStringFunction((str) => {
	    return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''));
	});
	/**
	 * @private
	 */
	const capitalize = cacheStringFunction((str) => str.charAt(0).toUpperCase() + str.slice(1));
	// compare whether a value has changed, accounting for NaN.
	const hasChanged = (value, oldValue) => value !== oldValue && (value === value || oldValue === oldValue);
	let _globalThis;
	const getGlobalThis = () => {
	    return (_globalThis ||
	        (_globalThis =
	            typeof globalThis !== 'undefined'
	                ? globalThis
	                : typeof self !== 'undefined'
	                    ? self
	                    : typeof window !== 'undefined'
	                        ? window
	                        : typeof global !== 'undefined'
	                            ? global
	                            : {}));
	};

	const targetMap = new WeakMap();
	const effectStack = [];
	let activeEffect;
	const ITERATE_KEY = Symbol((process.env.NODE_ENV !== 'production') ? 'iterate' : '');
	const MAP_KEY_ITERATE_KEY = Symbol((process.env.NODE_ENV !== 'production') ? 'Map key iterate' : '');
	function isEffect(fn) {
	    return fn && fn._isEffect === true;
	}
	function effect(fn, options = EMPTY_OBJ) {
	    if (isEffect(fn)) {
	        fn = fn.raw;
	    }
	    const effect = createReactiveEffect(fn, options);
	    if (!options.lazy) {
	        effect();
	    }
	    return effect;
	}
	function stop(effect) {
	    if (effect.active) {
	        cleanup(effect);
	        if (effect.options.onStop) {
	            effect.options.onStop();
	        }
	        effect.active = false;
	    }
	}
	let uid = 0;
	function createReactiveEffect(fn, options) {
	    const effect = function reactiveEffect() {
	        if (!effect.active) {
	            return options.scheduler ? undefined : fn();
	        }
	        if (!effectStack.includes(effect)) {
	            cleanup(effect);
	            try {
	                enableTracking();
	                effectStack.push(effect);
	                activeEffect = effect;
	                return fn();
	            }
	            finally {
	                effectStack.pop();
	                resetTracking();
	                activeEffect = effectStack[effectStack.length - 1];
	            }
	        }
	    };
	    effect.id = uid++;
	    effect.allowRecurse = !!options.allowRecurse;
	    effect._isEffect = true;
	    effect.active = true;
	    effect.raw = fn;
	    effect.deps = [];
	    effect.options = options;
	    return effect;
	}
	function cleanup(effect) {
	    const { deps } = effect;
	    if (deps.length) {
	        for (let i = 0; i < deps.length; i++) {
	            deps[i].delete(effect);
	        }
	        deps.length = 0;
	    }
	}
	let shouldTrack = true;
	const trackStack = [];
	function pauseTracking() {
	    trackStack.push(shouldTrack);
	    shouldTrack = false;
	}
	function enableTracking() {
	    trackStack.push(shouldTrack);
	    shouldTrack = true;
	}
	function resetTracking() {
	    const last = trackStack.pop();
	    shouldTrack = last === undefined ? true : last;
	}
	function track(target, type, key) {
	    if (!shouldTrack || activeEffect === undefined) {
	        return;
	    }
	    let depsMap = targetMap.get(target);
	    if (!depsMap) {
	        targetMap.set(target, (depsMap = new Map()));
	    }
	    let dep = depsMap.get(key);
	    if (!dep) {
	        depsMap.set(key, (dep = new Set()));
	    }
	    if (!dep.has(activeEffect)) {
	        dep.add(activeEffect);
	        activeEffect.deps.push(dep);
	        if ((process.env.NODE_ENV !== 'production') && activeEffect.options.onTrack) {
	            activeEffect.options.onTrack({
	                effect: activeEffect,
	                target,
	                type,
	                key
	            });
	        }
	    }
	}
	function trigger(target, type, key, newValue, oldValue, oldTarget) {
	    const depsMap = targetMap.get(target);
	    if (!depsMap) {
	        // never been tracked
	        return;
	    }
	    const effects = new Set();
	    const add = (effectsToAdd) => {
	        if (effectsToAdd) {
	            effectsToAdd.forEach(effect => {
	                if (effect !== activeEffect || effect.allowRecurse) {
	                    effects.add(effect);
	                }
	            });
	        }
	    };
	    if (type === "clear" /* CLEAR */) {
	        // collection being cleared
	        // trigger all effects for target
	        depsMap.forEach(add);
	    }
	    else if (key === 'length' && isArray(target)) {
	        depsMap.forEach((dep, key) => {
	            if (key === 'length' || key >= newValue) {
	                add(dep);
	            }
	        });
	    }
	    else {
	        // schedule runs for SET | ADD | DELETE
	        if (key !== void 0) {
	            add(depsMap.get(key));
	        }
	        // also run for iteration key on ADD | DELETE | Map.SET
	        switch (type) {
	            case "add" /* ADD */:
	                if (!isArray(target)) {
	                    add(depsMap.get(ITERATE_KEY));
	                    if (isMap(target)) {
	                        add(depsMap.get(MAP_KEY_ITERATE_KEY));
	                    }
	                }
	                else if (isIntegerKey(key)) {
	                    // new index added to array -> length changes
	                    add(depsMap.get('length'));
	                }
	                break;
	            case "delete" /* DELETE */:
	                if (!isArray(target)) {
	                    add(depsMap.get(ITERATE_KEY));
	                    if (isMap(target)) {
	                        add(depsMap.get(MAP_KEY_ITERATE_KEY));
	                    }
	                }
	                break;
	            case "set" /* SET */:
	                if (isMap(target)) {
	                    add(depsMap.get(ITERATE_KEY));
	                }
	                break;
	        }
	    }
	    const run = (effect) => {
	        if ((process.env.NODE_ENV !== 'production') && effect.options.onTrigger) {
	            effect.options.onTrigger({
	                effect,
	                target,
	                key,
	                type,
	                newValue,
	                oldValue,
	                oldTarget
	            });
	        }
	        if (effect.options.scheduler) {
	            effect.options.scheduler(effect);
	        }
	        else {
	            effect();
	        }
	    };
	    effects.forEach(run);
	}

	const builtInSymbols = new Set(Object.getOwnPropertyNames(Symbol)
	    .map(key => Symbol[key])
	    .filter(isSymbol));
	const get = /*#__PURE__*/ createGetter();
	const shallowGet = /*#__PURE__*/ createGetter(false, true);
	const readonlyGet = /*#__PURE__*/ createGetter(true);
	const shallowReadonlyGet = /*#__PURE__*/ createGetter(true, true);
	const arrayInstrumentations = {};
	['includes', 'indexOf', 'lastIndexOf'].forEach(key => {
	    const method = Array.prototype[key];
	    arrayInstrumentations[key] = function (...args) {
	        const arr = toRaw(this);
	        for (let i = 0, l = this.length; i < l; i++) {
	            track(arr, "get" /* GET */, i + '');
	        }
	        // we run the method using the original args first (which may be reactive)
	        const res = method.apply(arr, args);
	        if (res === -1 || res === false) {
	            // if that didn't work, run it again using raw values.
	            return method.apply(arr, args.map(toRaw));
	        }
	        else {
	            return res;
	        }
	    };
	});
	['push', 'pop', 'shift', 'unshift', 'splice'].forEach(key => {
	    const method = Array.prototype[key];
	    arrayInstrumentations[key] = function (...args) {
	        pauseTracking();
	        const res = method.apply(this, args);
	        resetTracking();
	        return res;
	    };
	});
	function createGetter(isReadonly = false, shallow = false) {
	    return function get(target, key, receiver) {
	        if (key === "__v_isReactive" /* IS_REACTIVE */) {
	            return !isReadonly;
	        }
	        else if (key === "__v_isReadonly" /* IS_READONLY */) {
	            return isReadonly;
	        }
	        else if (key === "__v_raw" /* RAW */ &&
	            receiver === (isReadonly ? readonlyMap : reactiveMap).get(target)) {
	            return target;
	        }
	        const targetIsArray = isArray(target);
	        if (targetIsArray && hasOwn(arrayInstrumentations, key)) {
	            return Reflect.get(arrayInstrumentations, key, receiver);
	        }
	        const res = Reflect.get(target, key, receiver);
	        if (isSymbol(key)
	            ? builtInSymbols.has(key)
	            : key === `__proto__` || key === `__v_isRef`) {
	            return res;
	        }
	        if (!isReadonly) {
	            track(target, "get" /* GET */, key);
	        }
	        if (shallow) {
	            return res;
	        }
	        if (isRef(res)) {
	            // ref unwrapping - does not apply for Array + integer key.
	            const shouldUnwrap = !targetIsArray || !isIntegerKey(key);
	            return shouldUnwrap ? res.value : res;
	        }
	        if (isObject(res)) {
	            // Convert returned value into a proxy as well. we do the isObject check
	            // here to avoid invalid value warning. Also need to lazy access readonly
	            // and reactive here to avoid circular dependency.
	            return isReadonly ? readonly(res) : reactive(res);
	        }
	        return res;
	    };
	}
	const set = /*#__PURE__*/ createSetter();
	const shallowSet = /*#__PURE__*/ createSetter(true);
	function createSetter(shallow = false) {
	    return function set(target, key, value, receiver) {
	        const oldValue = target[key];
	        if (!shallow) {
	            value = toRaw(value);
	            if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
	                oldValue.value = value;
	                return true;
	            }
	        }
	        const hadKey = isArray(target) && isIntegerKey(key)
	            ? Number(key) < target.length
	            : hasOwn(target, key);
	        const result = Reflect.set(target, key, value, receiver);
	        // don't trigger if target is something up in the prototype chain of original
	        if (target === toRaw(receiver)) {
	            if (!hadKey) {
	                trigger(target, "add" /* ADD */, key, value);
	            }
	            else if (hasChanged(value, oldValue)) {
	                trigger(target, "set" /* SET */, key, value, oldValue);
	            }
	        }
	        return result;
	    };
	}
	function deleteProperty(target, key) {
	    const hadKey = hasOwn(target, key);
	    const oldValue = target[key];
	    const result = Reflect.deleteProperty(target, key);
	    if (result && hadKey) {
	        trigger(target, "delete" /* DELETE */, key, undefined, oldValue);
	    }
	    return result;
	}
	function has(target, key) {
	    const result = Reflect.has(target, key);
	    if (!isSymbol(key) || !builtInSymbols.has(key)) {
	        track(target, "has" /* HAS */, key);
	    }
	    return result;
	}
	function ownKeys(target) {
	    track(target, "iterate" /* ITERATE */, isArray(target) ? 'length' : ITERATE_KEY);
	    return Reflect.ownKeys(target);
	}
	const mutableHandlers = {
	    get,
	    set,
	    deleteProperty,
	    has,
	    ownKeys
	};
	const readonlyHandlers = {
	    get: readonlyGet,
	    set(target, key) {
	        if ((process.env.NODE_ENV !== 'production')) {
	            console.warn(`Set operation on key "${String(key)}" failed: target is readonly.`, target);
	        }
	        return true;
	    },
	    deleteProperty(target, key) {
	        if ((process.env.NODE_ENV !== 'production')) {
	            console.warn(`Delete operation on key "${String(key)}" failed: target is readonly.`, target);
	        }
	        return true;
	    }
	};
	const shallowReactiveHandlers = extend({}, mutableHandlers, {
	    get: shallowGet,
	    set: shallowSet
	});
	// Props handlers are special in the sense that it should not unwrap top-level
	// refs (in order to allow refs to be explicitly passed down), but should
	// retain the reactivity of the normal readonly object.
	const shallowReadonlyHandlers = extend({}, readonlyHandlers, {
	    get: shallowReadonlyGet
	});

	const toReactive = (value) => isObject(value) ? reactive(value) : value;
	const toReadonly = (value) => isObject(value) ? readonly(value) : value;
	const toShallow = (value) => value;
	const getProto = (v) => Reflect.getPrototypeOf(v);
	function get$1(target, key, isReadonly = false, isShallow = false) {
	    // #1772: readonly(reactive(Map)) should return readonly + reactive version
	    // of the value
	    target = target["__v_raw" /* RAW */];
	    const rawTarget = toRaw(target);
	    const rawKey = toRaw(key);
	    if (key !== rawKey) {
	        !isReadonly && track(rawTarget, "get" /* GET */, key);
	    }
	    !isReadonly && track(rawTarget, "get" /* GET */, rawKey);
	    const { has } = getProto(rawTarget);
	    const wrap = isReadonly ? toReadonly : isShallow ? toShallow : toReactive;
	    if (has.call(rawTarget, key)) {
	        return wrap(target.get(key));
	    }
	    else if (has.call(rawTarget, rawKey)) {
	        return wrap(target.get(rawKey));
	    }
	}
	function has$1(key, isReadonly = false) {
	    const target = this["__v_raw" /* RAW */];
	    const rawTarget = toRaw(target);
	    const rawKey = toRaw(key);
	    if (key !== rawKey) {
	        !isReadonly && track(rawTarget, "has" /* HAS */, key);
	    }
	    !isReadonly && track(rawTarget, "has" /* HAS */, rawKey);
	    return key === rawKey
	        ? target.has(key)
	        : target.has(key) || target.has(rawKey);
	}
	function size(target, isReadonly = false) {
	    target = target["__v_raw" /* RAW */];
	    !isReadonly && track(toRaw(target), "iterate" /* ITERATE */, ITERATE_KEY);
	    return Reflect.get(target, 'size', target);
	}
	function add(value) {
	    value = toRaw(value);
	    const target = toRaw(this);
	    const proto = getProto(target);
	    const hadKey = proto.has.call(target, value);
	    const result = target.add(value);
	    if (!hadKey) {
	        trigger(target, "add" /* ADD */, value, value);
	    }
	    return result;
	}
	function set$1(key, value) {
	    value = toRaw(value);
	    const target = toRaw(this);
	    const { has, get } = getProto(target);
	    let hadKey = has.call(target, key);
	    if (!hadKey) {
	        key = toRaw(key);
	        hadKey = has.call(target, key);
	    }
	    else if ((process.env.NODE_ENV !== 'production')) {
	        checkIdentityKeys(target, has, key);
	    }
	    const oldValue = get.call(target, key);
	    const result = target.set(key, value);
	    if (!hadKey) {
	        trigger(target, "add" /* ADD */, key, value);
	    }
	    else if (hasChanged(value, oldValue)) {
	        trigger(target, "set" /* SET */, key, value, oldValue);
	    }
	    return result;
	}
	function deleteEntry(key) {
	    const target = toRaw(this);
	    const { has, get } = getProto(target);
	    let hadKey = has.call(target, key);
	    if (!hadKey) {
	        key = toRaw(key);
	        hadKey = has.call(target, key);
	    }
	    else if ((process.env.NODE_ENV !== 'production')) {
	        checkIdentityKeys(target, has, key);
	    }
	    const oldValue = get ? get.call(target, key) : undefined;
	    // forward the operation before queueing reactions
	    const result = target.delete(key);
	    if (hadKey) {
	        trigger(target, "delete" /* DELETE */, key, undefined, oldValue);
	    }
	    return result;
	}
	function clear() {
	    const target = toRaw(this);
	    const hadItems = target.size !== 0;
	    const oldTarget = (process.env.NODE_ENV !== 'production')
	        ? isMap(target)
	            ? new Map(target)
	            : new Set(target)
	        : undefined;
	    // forward the operation before queueing reactions
	    const result = target.clear();
	    if (hadItems) {
	        trigger(target, "clear" /* CLEAR */, undefined, undefined, oldTarget);
	    }
	    return result;
	}
	function createForEach(isReadonly, isShallow) {
	    return function forEach(callback, thisArg) {
	        const observed = this;
	        const target = observed["__v_raw" /* RAW */];
	        const rawTarget = toRaw(target);
	        const wrap = isReadonly ? toReadonly : isShallow ? toShallow : toReactive;
	        !isReadonly && track(rawTarget, "iterate" /* ITERATE */, ITERATE_KEY);
	        return target.forEach((value, key) => {
	            // important: make sure the callback is
	            // 1. invoked with the reactive map as `this` and 3rd arg
	            // 2. the value received should be a corresponding reactive/readonly.
	            return callback.call(thisArg, wrap(value), wrap(key), observed);
	        });
	    };
	}
	function createIterableMethod(method, isReadonly, isShallow) {
	    return function (...args) {
	        const target = this["__v_raw" /* RAW */];
	        const rawTarget = toRaw(target);
	        const targetIsMap = isMap(rawTarget);
	        const isPair = method === 'entries' || (method === Symbol.iterator && targetIsMap);
	        const isKeyOnly = method === 'keys' && targetIsMap;
	        const innerIterator = target[method](...args);
	        const wrap = isReadonly ? toReadonly : isShallow ? toShallow : toReactive;
	        !isReadonly &&
	            track(rawTarget, "iterate" /* ITERATE */, isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
	        // return a wrapped iterator which returns observed versions of the
	        // values emitted from the real iterator
	        return {
	            // iterator protocol
	            next() {
	                const { value, done } = innerIterator.next();
	                return done
	                    ? { value, done }
	                    : {
	                        value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
	                        done
	                    };
	            },
	            // iterable protocol
	            [Symbol.iterator]() {
	                return this;
	            }
	        };
	    };
	}
	function createReadonlyMethod(type) {
	    return function (...args) {
	        if ((process.env.NODE_ENV !== 'production')) {
	            const key = args[0] ? `on key "${args[0]}" ` : ``;
	            console.warn(`${capitalize(type)} operation ${key}failed: target is readonly.`, toRaw(this));
	        }
	        return type === "delete" /* DELETE */ ? false : this;
	    };
	}
	const mutableInstrumentations = {
	    get(key) {
	        return get$1(this, key);
	    },
	    get size() {
	        return size(this);
	    },
	    has: has$1,
	    add,
	    set: set$1,
	    delete: deleteEntry,
	    clear,
	    forEach: createForEach(false, false)
	};
	const shallowInstrumentations = {
	    get(key) {
	        return get$1(this, key, false, true);
	    },
	    get size() {
	        return size(this);
	    },
	    has: has$1,
	    add,
	    set: set$1,
	    delete: deleteEntry,
	    clear,
	    forEach: createForEach(false, true)
	};
	const readonlyInstrumentations = {
	    get(key) {
	        return get$1(this, key, true);
	    },
	    get size() {
	        return size(this, true);
	    },
	    has(key) {
	        return has$1.call(this, key, true);
	    },
	    add: createReadonlyMethod("add" /* ADD */),
	    set: createReadonlyMethod("set" /* SET */),
	    delete: createReadonlyMethod("delete" /* DELETE */),
	    clear: createReadonlyMethod("clear" /* CLEAR */),
	    forEach: createForEach(true, false)
	};
	const iteratorMethods = ['keys', 'values', 'entries', Symbol.iterator];
	iteratorMethods.forEach(method => {
	    mutableInstrumentations[method] = createIterableMethod(method, false, false);
	    readonlyInstrumentations[method] = createIterableMethod(method, true, false);
	    shallowInstrumentations[method] = createIterableMethod(method, false, true);
	});
	function createInstrumentationGetter(isReadonly, shallow) {
	    const instrumentations = shallow
	        ? shallowInstrumentations
	        : isReadonly
	            ? readonlyInstrumentations
	            : mutableInstrumentations;
	    return (target, key, receiver) => {
	        if (key === "__v_isReactive" /* IS_REACTIVE */) {
	            return !isReadonly;
	        }
	        else if (key === "__v_isReadonly" /* IS_READONLY */) {
	            return isReadonly;
	        }
	        else if (key === "__v_raw" /* RAW */) {
	            return target;
	        }
	        return Reflect.get(hasOwn(instrumentations, key) && key in target
	            ? instrumentations
	            : target, key, receiver);
	    };
	}
	const mutableCollectionHandlers = {
	    get: createInstrumentationGetter(false, false)
	};
	const readonlyCollectionHandlers = {
	    get: createInstrumentationGetter(true, false)
	};
	function checkIdentityKeys(target, has, key) {
	    const rawKey = toRaw(key);
	    if (rawKey !== key && has.call(target, rawKey)) {
	        const type = toRawType(target);
	        console.warn(`Reactive ${type} contains both the raw and reactive ` +
	            `versions of the same object${type === `Map` ? ` as keys` : ``}, ` +
	            `which can lead to inconsistencies. ` +
	            `Avoid differentiating between the raw and reactive versions ` +
	            `of an object and only use the reactive version if possible.`);
	    }
	}

	const reactiveMap = new WeakMap();
	const readonlyMap = new WeakMap();
	function targetTypeMap(rawType) {
	    switch (rawType) {
	        case 'Object':
	        case 'Array':
	            return 1 /* COMMON */;
	        case 'Map':
	        case 'Set':
	        case 'WeakMap':
	        case 'WeakSet':
	            return 2 /* COLLECTION */;
	        default:
	            return 0 /* INVALID */;
	    }
	}
	function getTargetType(value) {
	    return value["__v_skip" /* SKIP */] || !Object.isExtensible(value)
	        ? 0 /* INVALID */
	        : targetTypeMap(toRawType(value));
	}
	function reactive(target) {
	    // if trying to observe a readonly proxy, return the readonly version.
	    if (target && target["__v_isReadonly" /* IS_READONLY */]) {
	        return target;
	    }
	    return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers);
	}
	function readonly(target) {
	    return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers);
	}
	// Return a reactive-copy of the original object, where only the root level
	// properties are readonly, and does NOT unwrap refs nor recursively convert
	// returned properties.
	// This is used for creating the props proxy object for stateful components.
	function shallowReadonly(target) {
	    return createReactiveObject(target, true, shallowReadonlyHandlers, readonlyCollectionHandlers);
	}
	function createReactiveObject(target, isReadonly, baseHandlers, collectionHandlers) {
	    if (!isObject(target)) {
	        if ((process.env.NODE_ENV !== 'production')) {
	            console.warn(`value cannot be made reactive: ${String(target)}`);
	        }
	        return target;
	    }
	    // target is already a Proxy, return it.
	    // exception: calling readonly() on a reactive object
	    if (target["__v_raw" /* RAW */] &&
	        !(isReadonly && target["__v_isReactive" /* IS_REACTIVE */])) {
	        return target;
	    }
	    // target already has corresponding Proxy
	    const proxyMap = isReadonly ? readonlyMap : reactiveMap;
	    const existingProxy = proxyMap.get(target);
	    if (existingProxy) {
	        return existingProxy;
	    }
	    // only a whitelist of value types can be observed.
	    const targetType = getTargetType(target);
	    if (targetType === 0 /* INVALID */) {
	        return target;
	    }
	    const proxy = new Proxy(target, targetType === 2 /* COLLECTION */ ? collectionHandlers : baseHandlers);
	    proxyMap.set(target, proxy);
	    return proxy;
	}
	function isReactive(value) {
	    if (isReadonly(value)) {
	        return isReactive(value["__v_raw" /* RAW */]);
	    }
	    return !!(value && value["__v_isReactive" /* IS_REACTIVE */]);
	}
	function isReadonly(value) {
	    return !!(value && value["__v_isReadonly" /* IS_READONLY */]);
	}
	function isProxy(value) {
	    return isReactive(value) || isReadonly(value);
	}
	function toRaw(observed) {
	    return ((observed && toRaw(observed["__v_raw" /* RAW */])) || observed);
	}
	function isRef(r) {
	    return Boolean(r && r.__v_isRef === true);
	}

	const stack = [];
	function pushWarningContext(vnode) {
	    stack.push(vnode);
	}
	function popWarningContext() {
	    stack.pop();
	}
	function warn(msg, ...args) {
	    // avoid props formatting or warn handler tracking deps that might be mutated
	    // during patch, leading to infinite recursion.
	    pauseTracking();
	    const instance = stack.length ? stack[stack.length - 1].component : null;
	    const appWarnHandler = instance && instance.appContext.config.warnHandler;
	    const trace = getComponentTrace();
	    if (appWarnHandler) {
	        callWithErrorHandling(appWarnHandler, instance, 11 /* APP_WARN_HANDLER */, [
	            msg + args.join(''),
	            instance && instance.proxy,
	            trace
	                .map(({ vnode }) => `at <${formatComponentName(instance, vnode.type)}>`)
	                .join('\n'),
	            trace
	        ]);
	    }
	    else {
	        const warnArgs = [`[Vue warn]: ${msg}`, ...args];
	        /* istanbul ignore if */
	        if (trace.length &&
	            // avoid spamming console during tests
	            !false) {
	            warnArgs.push(`\n`, ...formatTrace(trace));
	        }
	        console.warn(...warnArgs);
	    }
	    resetTracking();
	}
	function getComponentTrace() {
	    let currentVNode = stack[stack.length - 1];
	    if (!currentVNode) {
	        return [];
	    }
	    // we can't just use the stack because it will be incomplete during updates
	    // that did not start from the root. Re-construct the parent chain using
	    // instance parent pointers.
	    const normalizedStack = [];
	    while (currentVNode) {
	        const last = normalizedStack[0];
	        if (last && last.vnode === currentVNode) {
	            last.recurseCount++;
	        }
	        else {
	            normalizedStack.push({
	                vnode: currentVNode,
	                recurseCount: 0
	            });
	        }
	        const parentInstance = currentVNode.component && currentVNode.component.parent;
	        currentVNode = parentInstance && parentInstance.vnode;
	    }
	    return normalizedStack;
	}
	/* istanbul ignore next */
	function formatTrace(trace) {
	    const logs = [];
	    trace.forEach((entry, i) => {
	        logs.push(...(i === 0 ? [] : [`\n`]), ...formatTraceEntry(entry));
	    });
	    return logs;
	}
	function formatTraceEntry({ vnode, recurseCount }) {
	    const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
	    const isRoot = vnode.component ? vnode.component.parent == null : false;
	    const open = ` at <${formatComponentName(vnode.component, vnode.type, isRoot)}`;
	    const close = `>` + postfix;
	    return vnode.props
	        ? [open, ...formatProps(vnode.props), close]
	        : [open + close];
	}
	/* istanbul ignore next */
	function formatProps(props) {
	    const res = [];
	    const keys = Object.keys(props);
	    keys.slice(0, 3).forEach(key => {
	        res.push(...formatProp(key, props[key]));
	    });
	    if (keys.length > 3) {
	        res.push(` ...`);
	    }
	    return res;
	}
	/* istanbul ignore next */
	function formatProp(key, value, raw) {
	    if (isString(value)) {
	        value = JSON.stringify(value);
	        return raw ? value : [`${key}=${value}`];
	    }
	    else if (typeof value === 'number' ||
	        typeof value === 'boolean' ||
	        value == null) {
	        return raw ? value : [`${key}=${value}`];
	    }
	    else if (isRef(value)) {
	        value = formatProp(key, toRaw(value.value), true);
	        return raw ? value : [`${key}=Ref<`, value, `>`];
	    }
	    else if (isFunction(value)) {
	        return [`${key}=fn${value.name ? `<${value.name}>` : ``}`];
	    }
	    else {
	        value = toRaw(value);
	        return raw ? value : [`${key}=`, value];
	    }
	}

	const ErrorTypeStrings = {
	    ["bc" /* BEFORE_CREATE */]: 'beforeCreate hook',
	    ["c" /* CREATED */]: 'created hook',
	    ["bm" /* BEFORE_MOUNT */]: 'beforeMount hook',
	    ["m" /* MOUNTED */]: 'mounted hook',
	    ["bu" /* BEFORE_UPDATE */]: 'beforeUpdate hook',
	    ["u" /* UPDATED */]: 'updated',
	    ["bum" /* BEFORE_UNMOUNT */]: 'beforeUnmount hook',
	    ["um" /* UNMOUNTED */]: 'unmounted hook',
	    ["a" /* ACTIVATED */]: 'activated hook',
	    ["da" /* DEACTIVATED */]: 'deactivated hook',
	    ["ec" /* ERROR_CAPTURED */]: 'errorCaptured hook',
	    ["rtc" /* RENDER_TRACKED */]: 'renderTracked hook',
	    ["rtg" /* RENDER_TRIGGERED */]: 'renderTriggered hook',
	    [0 /* SETUP_FUNCTION */]: 'setup function',
	    [1 /* RENDER_FUNCTION */]: 'render function',
	    [2 /* WATCH_GETTER */]: 'watcher getter',
	    [3 /* WATCH_CALLBACK */]: 'watcher callback',
	    [4 /* WATCH_CLEANUP */]: 'watcher cleanup function',
	    [5 /* NATIVE_EVENT_HANDLER */]: 'native event handler',
	    [6 /* COMPONENT_EVENT_HANDLER */]: 'component event handler',
	    [7 /* VNODE_HOOK */]: 'vnode hook',
	    [8 /* DIRECTIVE_HOOK */]: 'directive hook',
	    [9 /* TRANSITION_HOOK */]: 'transition hook',
	    [10 /* APP_ERROR_HANDLER */]: 'app errorHandler',
	    [11 /* APP_WARN_HANDLER */]: 'app warnHandler',
	    [12 /* FUNCTION_REF */]: 'ref function',
	    [13 /* ASYNC_COMPONENT_LOADER */]: 'async component loader',
	    [14 /* SCHEDULER */]: 'scheduler flush. This is likely a Vue internals bug. ' +
	        'Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/vue-next'
	};
	function callWithErrorHandling(fn, instance, type, args) {
	    let res;
	    try {
	        res = args ? fn(...args) : fn();
	    }
	    catch (err) {
	        handleError(err, instance, type);
	    }
	    return res;
	}
	function callWithAsyncErrorHandling(fn, instance, type, args) {
	    if (isFunction(fn)) {
	        const res = callWithErrorHandling(fn, instance, type, args);
	        if (res && isPromise(res)) {
	            res.catch(err => {
	                handleError(err, instance, type);
	            });
	        }
	        return res;
	    }
	    const values = [];
	    for (let i = 0; i < fn.length; i++) {
	        values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
	    }
	    return values;
	}
	function handleError(err, instance, type, throwInDev = true) {
	    const contextVNode = instance ? instance.vnode : null;
	    if (instance) {
	        let cur = instance.parent;
	        // the exposed instance is the render proxy to keep it consistent with 2.x
	        const exposedInstance = instance.proxy;
	        // in production the hook receives only the error code
	        const errorInfo = (process.env.NODE_ENV !== 'production') ? ErrorTypeStrings[type] : type;
	        while (cur) {
	            const errorCapturedHooks = cur.ec;
	            if (errorCapturedHooks) {
	                for (let i = 0; i < errorCapturedHooks.length; i++) {
	                    if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
	                        return;
	                    }
	                }
	            }
	            cur = cur.parent;
	        }
	        // app-level handling
	        const appErrorHandler = instance.appContext.config.errorHandler;
	        if (appErrorHandler) {
	            callWithErrorHandling(appErrorHandler, null, 10 /* APP_ERROR_HANDLER */, [err, exposedInstance, errorInfo]);
	            return;
	        }
	    }
	    logError(err, type, contextVNode, throwInDev);
	}
	function logError(err, type, contextVNode, throwInDev = true) {
	    if ((process.env.NODE_ENV !== 'production')) {
	        const info = ErrorTypeStrings[type];
	        if (contextVNode) {
	            pushWarningContext(contextVNode);
	        }
	        warn(`Unhandled error${info ? ` during execution of ${info}` : ``}`);
	        if (contextVNode) {
	            popWarningContext();
	        }
	        // crash in dev by default so it's more noticeable
	        if (throwInDev) {
	            throw err;
	        }
	        else {
	            console.error(err);
	        }
	    }
	    else {
	        // recover in prod to reduce the impact on end-user
	        console.error(err);
	    }
	}

	let isFlushing = false;
	let isFlushPending = false;
	const queue = [];
	let flushIndex = 0;
	const pendingPreFlushCbs = [];
	let activePreFlushCbs = null;
	let preFlushIndex = 0;
	const pendingPostFlushCbs = [];
	let activePostFlushCbs = null;
	let postFlushIndex = 0;
	const resolvedPromise = Promise.resolve();
	let currentFlushPromise = null;
	let currentPreFlushParentJob = null;
	const RECURSION_LIMIT = 100;
	function nextTick(fn) {
	    const p = currentFlushPromise || resolvedPromise;
	    return fn ? p.then(this ? fn.bind(this) : fn) : p;
	}
	function queueJob(job) {
	    // the dedupe search uses the startIndex argument of Array.includes()
	    // by default the search index includes the current job that is being run
	    // so it cannot recursively trigger itself again.
	    // if the job is a watch() callback, the search will start with a +1 index to
	    // allow it recursively trigger itself - it is the user's responsibility to
	    // ensure it doesn't end up in an infinite loop.
	    if ((!queue.length ||
	        !queue.includes(job, isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex)) &&
	        job !== currentPreFlushParentJob) {
	        queue.push(job);
	        queueFlush();
	    }
	}
	function queueFlush() {
	    if (!isFlushing && !isFlushPending) {
	        isFlushPending = true;
	        currentFlushPromise = resolvedPromise.then(flushJobs);
	    }
	}
	function queueCb(cb, activeQueue, pendingQueue, index) {
	    if (!isArray(cb)) {
	        if (!activeQueue ||
	            !activeQueue.includes(cb, cb.allowRecurse ? index + 1 : index)) {
	            pendingQueue.push(cb);
	        }
	    }
	    else {
	        // if cb is an array, it is a component lifecycle hook which can only be
	        // triggered by a job, which is already deduped in the main queue, so
	        // we can skip duplicate check here to improve perf
	        pendingQueue.push(...cb);
	    }
	    queueFlush();
	}
	function queuePreFlushCb(cb) {
	    queueCb(cb, activePreFlushCbs, pendingPreFlushCbs, preFlushIndex);
	}
	function queuePostFlushCb(cb) {
	    queueCb(cb, activePostFlushCbs, pendingPostFlushCbs, postFlushIndex);
	}
	function flushPreFlushCbs(seen, parentJob = null) {
	    if (pendingPreFlushCbs.length) {
	        currentPreFlushParentJob = parentJob;
	        activePreFlushCbs = [...new Set(pendingPreFlushCbs)];
	        pendingPreFlushCbs.length = 0;
	        if ((process.env.NODE_ENV !== 'production')) {
	            seen = seen || new Map();
	        }
	        for (preFlushIndex = 0; preFlushIndex < activePreFlushCbs.length; preFlushIndex++) {
	            if ((process.env.NODE_ENV !== 'production')) {
	                checkRecursiveUpdates(seen, activePreFlushCbs[preFlushIndex]);
	            }
	            activePreFlushCbs[preFlushIndex]();
	        }
	        activePreFlushCbs = null;
	        preFlushIndex = 0;
	        currentPreFlushParentJob = null;
	        // recursively flush until it drains
	        flushPreFlushCbs(seen, parentJob);
	    }
	}
	function flushPostFlushCbs(seen) {
	    if (pendingPostFlushCbs.length) {
	        const deduped = [...new Set(pendingPostFlushCbs)];
	        pendingPostFlushCbs.length = 0;
	        // #1947 already has active queue, nested flushPostFlushCbs call
	        if (activePostFlushCbs) {
	            activePostFlushCbs.push(...deduped);
	            return;
	        }
	        activePostFlushCbs = deduped;
	        if ((process.env.NODE_ENV !== 'production')) {
	            seen = seen || new Map();
	        }
	        activePostFlushCbs.sort((a, b) => getId(a) - getId(b));
	        for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
	            if ((process.env.NODE_ENV !== 'production')) {
	                checkRecursiveUpdates(seen, activePostFlushCbs[postFlushIndex]);
	            }
	            activePostFlushCbs[postFlushIndex]();
	        }
	        activePostFlushCbs = null;
	        postFlushIndex = 0;
	    }
	}
	const getId = (job) => job.id == null ? Infinity : job.id;
	function flushJobs(seen) {
	    isFlushPending = false;
	    isFlushing = true;
	    if ((process.env.NODE_ENV !== 'production')) {
	        seen = seen || new Map();
	    }
	    flushPreFlushCbs(seen);
	    // Sort queue before flush.
	    // This ensures that:
	    // 1. Components are updated from parent to child. (because parent is always
	    //    created before the child so its render effect will have smaller
	    //    priority number)
	    // 2. If a component is unmounted during a parent component's update,
	    //    its update can be skipped.
	    // Jobs can never be null before flush starts, since they are only invalidated
	    // during execution of another flushed job.
	    queue.sort((a, b) => getId(a) - getId(b));
	    try {
	        for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
	            const job = queue[flushIndex];
	            if (job) {
	                if ((process.env.NODE_ENV !== 'production')) {
	                    checkRecursiveUpdates(seen, job);
	                }
	                callWithErrorHandling(job, null, 14 /* SCHEDULER */);
	            }
	        }
	    }
	    finally {
	        flushIndex = 0;
	        queue.length = 0;
	        flushPostFlushCbs(seen);
	        isFlushing = false;
	        currentFlushPromise = null;
	        // some postFlushCb queued jobs!
	        // keep flushing until it drains.
	        if (queue.length || pendingPostFlushCbs.length) {
	            flushJobs(seen);
	        }
	    }
	}
	function checkRecursiveUpdates(seen, fn) {
	    if (!seen.has(fn)) {
	        seen.set(fn, 1);
	    }
	    else {
	        const count = seen.get(fn);
	        if (count > RECURSION_LIMIT) {
	            throw new Error(`Maximum recursive updates exceeded. ` +
	                `This means you have a reactive effect that is mutating its own ` +
	                `dependencies and thus recursively triggering itself. Possible sources ` +
	                `include component template, render function, updated hook or ` +
	                `watcher source function.`);
	        }
	        else {
	            seen.set(fn, count + 1);
	        }
	    }
	}
	const hmrDirtyComponents = new Set();
	// Expose the HMR runtime on the global object
	// This makes it entirely tree-shakable without polluting the exports and makes
	// it easier to be used in toolings like vue-loader
	// Note: for a component to be eligible for HMR it also needs the __hmrId option
	// to be set so that its instances can be registered / removed.
	if ((process.env.NODE_ENV !== 'production') && (true )) {
	    const globalObject = typeof global !== 'undefined'
	        ? global
	        : typeof self !== 'undefined'
	            ? self
	            : typeof window !== 'undefined'
	                ? window
	                : {};
	    globalObject.__VUE_HMR_RUNTIME__ = {
	        createRecord: tryWrap(createRecord),
	        rerender: tryWrap(rerender),
	        reload: tryWrap(reload)
	    };
	}
	const map = new Map();
	function createRecord(id) {
	    if (map.has(id)) {
	        return false;
	    }
	    map.set(id, new Set());
	    return true;
	}
	function rerender(id, newRender) {
	    const record = map.get(id);
	    if (!record)
	        return;
	    // Array.from creates a snapshot which avoids the set being mutated during
	    // updates
	    Array.from(record).forEach(instance => {
	        if (newRender) {
	            instance.render = newRender;
	        }
	        instance.renderCache = [];
	        instance.update();
	    });
	}
	function reload(id, newComp) {
	    const record = map.get(id);
	    if (!record)
	        return;
	    // Array.from creates a snapshot which avoids the set being mutated during
	    // updates
	    Array.from(record).forEach(instance => {
	        const comp = instance.type;
	        if (!hmrDirtyComponents.has(comp)) {
	            // 1. Update existing comp definition to match new one
	            newComp = isClassComponent(newComp) ? newComp.__vccOpts : newComp;
	            extend(comp, newComp);
	            for (const key in comp) {
	                if (!(key in newComp)) {
	                    delete comp[key];
	                }
	            }
	            // 2. Mark component dirty. This forces the renderer to replace the component
	            // on patch.
	            hmrDirtyComponents.add(comp);
	            // 3. Make sure to unmark the component after the reload.
	            queuePostFlushCb(() => {
	                hmrDirtyComponents.delete(comp);
	            });
	        }
	        if (instance.parent) {
	            // 4. Force the parent instance to re-render. This will cause all updated
	            // components to be unmounted and re-mounted. Queue the update so that we
	            // don't end up forcing the same parent to re-render multiple times.
	            queueJob(instance.parent.update);
	        }
	        else if (instance.appContext.reload) {
	            // root instance mounted via createApp() has a reload method
	            instance.appContext.reload();
	        }
	        else if (typeof window !== 'undefined') {
	            // root instance inside tree created via raw render(). Force reload.
	            window.location.reload();
	        }
	        else {
	            console.warn('[HMR] Root or manually mounted instance modified. Full reload required.');
	        }
	    });
	}
	function tryWrap(fn) {
	    return (id, arg) => {
	        try {
	            return fn(id, arg);
	        }
	        catch (e) {
	            console.error(e);
	            console.warn(`[HMR] Something went wrong during Vue component hot-reload. ` +
	                `Full reload required.`);
	        }
	    };
	}
	function setDevtoolsHook(hook) {
	}

	// mark the current rendering instance for asset resolution (e.g.
	// resolveComponent, resolveDirective) during render
	let currentRenderingInstance = null;
	function setCurrentRenderingInstance(instance) {
	    currentRenderingInstance = instance;
	}
	function markAttrsAccessed() {
	}
	/**
	 * dev only
	 */
	function filterSingleRoot(children) {
	    const filtered = children.filter(child => {
	        return !(isVNode(child) &&
	            child.type === Comment &&
	            child.children !== 'v-if');
	    });
	    return filtered.length === 1 && isVNode(filtered[0]) ? filtered[0] : null;
	}

	const isSuspense = (type) => type.__isSuspense;
	function normalizeSuspenseChildren(vnode) {
	    const { shapeFlag, children } = vnode;
	    let content;
	    let fallback;
	    if (shapeFlag & 32 /* SLOTS_CHILDREN */) {
	        content = normalizeSuspenseSlot(children.default);
	        fallback = normalizeSuspenseSlot(children.fallback);
	    }
	    else {
	        content = normalizeSuspenseSlot(children);
	        fallback = normalizeVNode(null);
	    }
	    return {
	        content,
	        fallback
	    };
	}
	function normalizeSuspenseSlot(s) {
	    if (isFunction(s)) {
	        s = s();
	    }
	    if (isArray(s)) {
	        const singleChild = filterSingleRoot(s);
	        if ((process.env.NODE_ENV !== 'production') && !singleChild) {
	            warn(`<Suspense> slots expect a single root node.`);
	        }
	        s = singleChild;
	    }
	    return normalizeVNode(s);
	}
	function queueEffectWithSuspense(fn, suspense) {
	    if (suspense && suspense.pendingBranch) {
	        if (isArray(fn)) {
	            suspense.effects.push(...fn);
	        }
	        else {
	            suspense.effects.push(fn);
	        }
	    }
	    else {
	        queuePostFlushCb(fn);
	    }
	}

	let isRenderingCompiledSlot = 0;
	const setCompiledSlotRendering = (n) => (isRenderingCompiledSlot += n);

	/**
	 * Wrap a slot function to memoize current rendering instance
	 * @private
	 */
	function withCtx(fn, ctx = currentRenderingInstance) {
	    if (!ctx)
	        return fn;
	    const renderFnWithContext = (...args) => {
	        // If a user calls a compiled slot inside a template expression (#1745), it
	        // can mess up block tracking, so by default we need to push a null block to
	        // avoid that. This isn't necessary if rendering a compiled `<slot>`.
	        if (!isRenderingCompiledSlot) {
	            openBlock(true /* null block that disables tracking */);
	        }
	        const owner = currentRenderingInstance;
	        setCurrentRenderingInstance(ctx);
	        const res = fn(...args);
	        setCurrentRenderingInstance(owner);
	        if (!isRenderingCompiledSlot) {
	            closeBlock();
	        }
	        return res;
	    };
	    renderFnWithContext._c = true;
	    return renderFnWithContext;
	}

	// SFC scoped style ID management.
	let currentScopeId = null;
	const scopeIdStack = [];
	/**
	 * @private
	 */
	function pushScopeId(id) {
	    scopeIdStack.push((currentScopeId = id));
	}
	/**
	 * @private
	 */
	function popScopeId() {
	    scopeIdStack.pop();
	    currentScopeId = scopeIdStack[scopeIdStack.length - 1] || null;
	}
	/**
	 * @private
	 */
	function withScopeId(id) {
	    return ((fn) => withCtx(function () {
	        pushScopeId(id);
	        const res = fn.apply(this, arguments);
	        popScopeId();
	        return res;
	    }));
	}
	// initial value for watchers to trigger on undefined initial values
	const INITIAL_WATCHER_VALUE = {};
	function doWatch(source, cb, { immediate, deep, flush, onTrack, onTrigger } = EMPTY_OBJ, instance = currentInstance) {
	    if ((process.env.NODE_ENV !== 'production') && !cb) {
	        if (immediate !== undefined) {
	            warn(`watch() "immediate" option is only respected when using the ` +
	                `watch(source, callback, options?) signature.`);
	        }
	        if (deep !== undefined) {
	            warn(`watch() "deep" option is only respected when using the ` +
	                `watch(source, callback, options?) signature.`);
	        }
	    }
	    const warnInvalidSource = (s) => {
	        warn(`Invalid watch source: `, s, `A watch source can only be a getter/effect function, a ref, ` +
	            `a reactive object, or an array of these types.`);
	    };
	    let getter;
	    let forceTrigger = false;
	    if (isRef(source)) {
	        getter = () => source.value;
	        forceTrigger = !!source._shallow;
	    }
	    else if (isReactive(source)) {
	        getter = () => source;
	        deep = true;
	    }
	    else if (isArray(source)) {
	        getter = () => source.map(s => {
	            if (isRef(s)) {
	                return s.value;
	            }
	            else if (isReactive(s)) {
	                return traverse(s);
	            }
	            else if (isFunction(s)) {
	                return callWithErrorHandling(s, instance, 2 /* WATCH_GETTER */);
	            }
	            else {
	                (process.env.NODE_ENV !== 'production') && warnInvalidSource(s);
	            }
	        });
	    }
	    else if (isFunction(source)) {
	        if (cb) {
	            // getter with cb
	            getter = () => callWithErrorHandling(source, instance, 2 /* WATCH_GETTER */);
	        }
	        else {
	            // no cb -> simple effect
	            getter = () => {
	                if (instance && instance.isUnmounted) {
	                    return;
	                }
	                if (cleanup) {
	                    cleanup();
	                }
	                return callWithErrorHandling(source, instance, 3 /* WATCH_CALLBACK */, [onInvalidate]);
	            };
	        }
	    }
	    else {
	        getter = NOOP;
	        (process.env.NODE_ENV !== 'production') && warnInvalidSource(source);
	    }
	    if (cb && deep) {
	        const baseGetter = getter;
	        getter = () => traverse(baseGetter());
	    }
	    let cleanup;
	    const onInvalidate = (fn) => {
	        cleanup = runner.options.onStop = () => {
	            callWithErrorHandling(fn, instance, 4 /* WATCH_CLEANUP */);
	        };
	    };
	    let oldValue = isArray(source) ? [] : INITIAL_WATCHER_VALUE;
	    const job = () => {
	        if (!runner.active) {
	            return;
	        }
	        if (cb) {
	            // watch(source, cb)
	            const newValue = runner();
	            if (deep || forceTrigger || hasChanged(newValue, oldValue)) {
	                // cleanup before running cb again
	                if (cleanup) {
	                    cleanup();
	                }
	                callWithAsyncErrorHandling(cb, instance, 3 /* WATCH_CALLBACK */, [
	                    newValue,
	                    // pass undefined as the old value when it's changed for the first time
	                    oldValue === INITIAL_WATCHER_VALUE ? undefined : oldValue,
	                    onInvalidate
	                ]);
	                oldValue = newValue;
	            }
	        }
	        else {
	            // watchEffect
	            runner();
	        }
	    };
	    // important: mark the job as a watcher callback so that scheduler knows
	    // it is allowed to self-trigger (#1727)
	    job.allowRecurse = !!cb;
	    let scheduler;
	    if (flush === 'sync') {
	        scheduler = job;
	    }
	    else if (flush === 'post') {
	        scheduler = () => queuePostRenderEffect(job, instance && instance.suspense);
	    }
	    else {
	        // default: 'pre'
	        scheduler = () => {
	            if (!instance || instance.isMounted) {
	                queuePreFlushCb(job);
	            }
	            else {
	                // with 'pre' option, the first call must happen before
	                // the component is mounted so it is called synchronously.
	                job();
	            }
	        };
	    }
	    const runner = effect(getter, {
	        lazy: true,
	        onTrack,
	        onTrigger,
	        scheduler
	    });
	    // initial run
	    if (cb) {
	        if (immediate) {
	            job();
	        }
	        else {
	            oldValue = runner();
	        }
	    }
	    else if (flush === 'post') {
	        queuePostRenderEffect(runner, instance && instance.suspense);
	    }
	    else {
	        runner();
	    }
	    return () => {
	        stop(runner);
	        if (instance) {
	            remove(instance.effects, runner);
	        }
	    };
	}
	// this.$watch
	function instanceWatch(source, cb, options) {
	    const publicThis = this.proxy;
	    const getter = isString(source)
	        ? () => publicThis[source]
	        : source.bind(publicThis);
	    return doWatch(getter, cb.bind(publicThis), options, this);
	}
	function traverse(value, seen = new Set()) {
	    if (!isObject(value) || seen.has(value)) {
	        return value;
	    }
	    seen.add(value);
	    if (isRef(value)) {
	        traverse(value.value, seen);
	    }
	    else if (isArray(value)) {
	        for (let i = 0; i < value.length; i++) {
	            traverse(value[i], seen);
	        }
	    }
	    else if (isSet(value) || isMap(value)) {
	        value.forEach((v) => {
	            traverse(v, seen);
	        });
	    }
	    else {
	        for (const key in value) {
	            traverse(value[key], seen);
	        }
	    }
	    return value;
	}
	const queuePostRenderEffect =  queueEffectWithSuspense
	    ;

	const isTeleport = (type) => type.__isTeleport;

	const COMPONENTS = 'components';
	/**
	 * @private
	 */
	function resolveComponent(name) {
	    return resolveAsset(COMPONENTS, name) || name;
	}
	const NULL_DYNAMIC_COMPONENT = Symbol();
	// implementation
	function resolveAsset(type, name, warnMissing = true) {
	    const instance = currentRenderingInstance || currentInstance;
	    if (instance) {
	        const Component = instance.type;
	        // self name has highest priority
	        if (type === COMPONENTS) {
	            const selfName = Component.displayName || Component.name;
	            if (selfName &&
	                (selfName === name ||
	                    selfName === camelize(name) ||
	                    selfName === capitalize(camelize(name)))) {
	                return Component;
	            }
	        }
	        const res = 
	        // local registration
	        // check instance[type] first for components with mixin or extends.
	        resolve(instance[type] || Component[type], name) ||
	            // global registration
	            resolve(instance.appContext[type], name);
	        if ((process.env.NODE_ENV !== 'production') && warnMissing && !res) {
	            warn(`Failed to resolve ${type.slice(0, -1)}: ${name}`);
	        }
	        return res;
	    }
	    else if ((process.env.NODE_ENV !== 'production')) {
	        warn(`resolve${capitalize(type.slice(0, -1))} ` +
	            `can only be used in render() or setup().`);
	    }
	}
	function resolve(registry, name) {
	    return (registry &&
	        (registry[name] ||
	            registry[camelize(name)] ||
	            registry[capitalize(camelize(name))]));
	}

	const Fragment = Symbol((process.env.NODE_ENV !== 'production') ? 'Fragment' : undefined);
	const Text = Symbol((process.env.NODE_ENV !== 'production') ? 'Text' : undefined);
	const Comment = Symbol((process.env.NODE_ENV !== 'production') ? 'Comment' : undefined);
	const Static = Symbol((process.env.NODE_ENV !== 'production') ? 'Static' : undefined);
	// Since v-if and v-for are the two possible ways node structure can dynamically
	// change, once we consider v-if branches and each v-for fragment a block, we
	// can divide a template into nested blocks, and within each block the node
	// structure would be stable. This allows us to skip most children diffing
	// and only worry about the dynamic nodes (indicated by patch flags).
	const blockStack = [];
	let currentBlock = null;
	/**
	 * Open a block.
	 * This must be called before `createBlock`. It cannot be part of `createBlock`
	 * because the children of the block are evaluated before `createBlock` itself
	 * is called. The generated code typically looks like this:
	 *
	 * ```js
	 * function render() {
	 *   return (openBlock(),createBlock('div', null, [...]))
	 * }
	 * ```
	 * disableTracking is true when creating a v-for fragment block, since a v-for
	 * fragment always diffs its children.
	 *
	 * @private
	 */
	function openBlock(disableTracking = false) {
	    blockStack.push((currentBlock = disableTracking ? null : []));
	}
	function closeBlock() {
	    blockStack.pop();
	    currentBlock = blockStack[blockStack.length - 1] || null;
	}
	/**
	 * Create a block root vnode. Takes the same exact arguments as `createVNode`.
	 * A block root keeps track of dynamic nodes within the block in the
	 * `dynamicChildren` array.
	 *
	 * @private
	 */
	function createBlock(type, props, children, patchFlag, dynamicProps) {
	    const vnode = createVNode(type, props, children, patchFlag, dynamicProps, true /* isBlock: prevent a block from tracking itself */);
	    // save current block children on the block vnode
	    vnode.dynamicChildren = currentBlock || EMPTY_ARR;
	    // close block
	    closeBlock();
	    // a block is always going to be patched, so track it as a child of its
	    // parent block
	    if ( currentBlock) {
	        currentBlock.push(vnode);
	    }
	    return vnode;
	}
	function isVNode(value) {
	    return value ? value.__v_isVNode === true : false;
	}
	const createVNodeWithArgsTransform = (...args) => {
	    return _createVNode(...( args));
	};
	const InternalObjectKey = `__vInternal`;
	const normalizeKey = ({ key }) => key != null ? key : null;
	const normalizeRef = ({ ref }) => {
	    return (ref != null
	        ? isArray(ref)
	            ? ref
	            : { i: currentRenderingInstance, r: ref }
	        : null);
	};
	const createVNode = ((process.env.NODE_ENV !== 'production')
	    ? createVNodeWithArgsTransform
	    : _createVNode);
	function _createVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
	    if (!type || type === NULL_DYNAMIC_COMPONENT) {
	        if ((process.env.NODE_ENV !== 'production') && !type) {
	            warn(`Invalid vnode type when creating vnode: ${type}.`);
	        }
	        type = Comment;
	    }
	    if (isVNode(type)) {
	        // createVNode receiving an existing vnode. This happens in cases like
	        // <component :is="vnode"/>
	        // #2078 make sure to merge refs during the clone instead of overwriting it
	        const cloned = cloneVNode(type, props, true /* mergeRef: true */);
	        if (children) {
	            normalizeChildren(cloned, children);
	        }
	        return cloned;
	    }
	    // class component normalization.
	    if (isClassComponent(type)) {
	        type = type.__vccOpts;
	    }
	    // class & style normalization.
	    if (props) {
	        // for reactive or proxy objects, we need to clone it to enable mutation.
	        if (isProxy(props) || InternalObjectKey in props) {
	            props = extend({}, props);
	        }
	        let { class: klass, style } = props;
	        if (klass && !isString(klass)) {
	            props.class = normalizeClass(klass);
	        }
	        if (isObject(style)) {
	            // reactive state objects need to be cloned since they are likely to be
	            // mutated
	            if (isProxy(style) && !isArray(style)) {
	                style = extend({}, style);
	            }
	            props.style = normalizeStyle(style);
	        }
	    }
	    // encode the vnode type information into a bitmap
	    const shapeFlag = isString(type)
	        ? 1 /* ELEMENT */
	        :  isSuspense(type)
	            ? 128 /* SUSPENSE */
	            : isTeleport(type)
	                ? 64 /* TELEPORT */
	                : isObject(type)
	                    ? 4 /* STATEFUL_COMPONENT */
	                    : isFunction(type)
	                        ? 2 /* FUNCTIONAL_COMPONENT */
	                        : 0;
	    if ((process.env.NODE_ENV !== 'production') && shapeFlag & 4 /* STATEFUL_COMPONENT */ && isProxy(type)) {
	        type = toRaw(type);
	        warn(`Vue received a Component which was made a reactive object. This can ` +
	            `lead to unnecessary performance overhead, and should be avoided by ` +
	            `marking the component with \`markRaw\` or using \`shallowRef\` ` +
	            `instead of \`ref\`.`, `\nComponent that was made reactive: `, type);
	    }
	    const vnode = {
	        __v_isVNode: true,
	        ["__v_skip" /* SKIP */]: true,
	        type,
	        props,
	        key: props && normalizeKey(props),
	        ref: props && normalizeRef(props),
	        scopeId: currentScopeId,
	        children: null,
	        component: null,
	        suspense: null,
	        ssContent: null,
	        ssFallback: null,
	        dirs: null,
	        transition: null,
	        el: null,
	        anchor: null,
	        target: null,
	        targetAnchor: null,
	        staticCount: 0,
	        shapeFlag,
	        patchFlag,
	        dynamicProps,
	        dynamicChildren: null,
	        appContext: null
	    };
	    // validate key
	    if ((process.env.NODE_ENV !== 'production') && vnode.key !== vnode.key) {
	        warn(`VNode created with invalid key (NaN). VNode type:`, vnode.type);
	    }
	    normalizeChildren(vnode, children);
	    // normalize suspense children
	    if ( shapeFlag & 128 /* SUSPENSE */) {
	        const { content, fallback } = normalizeSuspenseChildren(vnode);
	        vnode.ssContent = content;
	        vnode.ssFallback = fallback;
	    }
	    if (
	        // avoid a block node from tracking itself
	        !isBlockNode &&
	        // has current parent block
	        currentBlock &&
	        // presence of a patch flag indicates this node needs patching on updates.
	        // component nodes also should always be patched, because even if the
	        // component doesn't need to update, it needs to persist the instance on to
	        // the next vnode so that it can be properly unmounted later.
	        (patchFlag > 0 || shapeFlag & 6 /* COMPONENT */) &&
	        // the EVENTS flag is only for hydration and if it is the only flag, the
	        // vnode should not be considered dynamic due to handler caching.
	        patchFlag !== 32 /* HYDRATE_EVENTS */) {
	        currentBlock.push(vnode);
	    }
	    return vnode;
	}
	function cloneVNode(vnode, extraProps, mergeRef = false) {
	    // This is intentionally NOT using spread or extend to avoid the runtime
	    // key enumeration cost.
	    const { props, ref, patchFlag } = vnode;
	    const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
	    return {
	        __v_isVNode: true,
	        ["__v_skip" /* SKIP */]: true,
	        type: vnode.type,
	        props: mergedProps,
	        key: mergedProps && normalizeKey(mergedProps),
	        ref: extraProps && extraProps.ref
	            ? // #2078 in the case of <component :is="vnode" ref="extra"/>
	                // if the vnode itself already has a ref, cloneVNode will need to merge
	                // the refs so the single vnode can be set on multiple refs
	                mergeRef && ref
	                    ? isArray(ref)
	                        ? ref.concat(normalizeRef(extraProps))
	                        : [ref, normalizeRef(extraProps)]
	                    : normalizeRef(extraProps)
	            : ref,
	        scopeId: vnode.scopeId,
	        children: vnode.children,
	        target: vnode.target,
	        targetAnchor: vnode.targetAnchor,
	        staticCount: vnode.staticCount,
	        shapeFlag: vnode.shapeFlag,
	        // if the vnode is cloned with extra props, we can no longer assume its
	        // existing patch flag to be reliable and need to add the FULL_PROPS flag.
	        // note: perserve flag for fragments since they use the flag for children
	        // fast paths only.
	        patchFlag: extraProps && vnode.type !== Fragment
	            ? patchFlag === -1 // hoisted node
	                ? 16 /* FULL_PROPS */
	                : patchFlag | 16 /* FULL_PROPS */
	            : patchFlag,
	        dynamicProps: vnode.dynamicProps,
	        dynamicChildren: vnode.dynamicChildren,
	        appContext: vnode.appContext,
	        dirs: vnode.dirs,
	        transition: vnode.transition,
	        // These should technically only be non-null on mounted VNodes. However,
	        // they *should* be copied for kept-alive vnodes. So we just always copy
	        // them since them being non-null during a mount doesn't affect the logic as
	        // they will simply be overwritten.
	        component: vnode.component,
	        suspense: vnode.suspense,
	        ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
	        ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
	        el: vnode.el,
	        anchor: vnode.anchor
	    };
	}
	/**
	 * @private
	 */
	function createTextVNode(text = ' ', flag = 0) {
	    return createVNode(Text, null, text, flag);
	}
	function normalizeVNode(child) {
	    if (child == null || typeof child === 'boolean') {
	        // empty placeholder
	        return createVNode(Comment);
	    }
	    else if (isArray(child)) {
	        // fragment
	        return createVNode(Fragment, null, child);
	    }
	    else if (typeof child === 'object') {
	        // already vnode, this should be the most common since compiled templates
	        // always produce all-vnode children arrays
	        return child.el === null ? child : cloneVNode(child);
	    }
	    else {
	        // strings and numbers
	        return createVNode(Text, null, String(child));
	    }
	}
	function normalizeChildren(vnode, children) {
	    let type = 0;
	    const { shapeFlag } = vnode;
	    if (children == null) {
	        children = null;
	    }
	    else if (isArray(children)) {
	        type = 16 /* ARRAY_CHILDREN */;
	    }
	    else if (typeof children === 'object') {
	        if (shapeFlag & 1 /* ELEMENT */ || shapeFlag & 64 /* TELEPORT */) {
	            // Normalize slot to plain children for plain element and Teleport
	            const slot = children.default;
	            if (slot) {
	                // _c marker is added by withCtx() indicating this is a compiled slot
	                slot._c && setCompiledSlotRendering(1);
	                normalizeChildren(vnode, slot());
	                slot._c && setCompiledSlotRendering(-1);
	            }
	            return;
	        }
	        else {
	            type = 32 /* SLOTS_CHILDREN */;
	            const slotFlag = children._;
	            if (!slotFlag && !(InternalObjectKey in children)) {
	                children._ctx = currentRenderingInstance;
	            }
	            else if (slotFlag === 3 /* FORWARDED */ && currentRenderingInstance) {
	                // a child component receives forwarded slots from the parent.
	                // its slot type is determined by its parent's slot type.
	                if (currentRenderingInstance.vnode.patchFlag & 1024 /* DYNAMIC_SLOTS */) {
	                    children._ = 2 /* DYNAMIC */;
	                    vnode.patchFlag |= 1024 /* DYNAMIC_SLOTS */;
	                }
	                else {
	                    children._ = 1 /* STABLE */;
	                }
	            }
	        }
	    }
	    else if (isFunction(children)) {
	        children = { default: children, _ctx: currentRenderingInstance };
	        type = 32 /* SLOTS_CHILDREN */;
	    }
	    else {
	        children = String(children);
	        // force teleport children to array so it can be moved around
	        if (shapeFlag & 64 /* TELEPORT */) {
	            type = 16 /* ARRAY_CHILDREN */;
	            children = [createTextVNode(children)];
	        }
	        else {
	            type = 8 /* TEXT_CHILDREN */;
	        }
	    }
	    vnode.children = children;
	    vnode.shapeFlag |= type;
	}
	function mergeProps(...args) {
	    const ret = extend({}, args[0]);
	    for (let i = 1; i < args.length; i++) {
	        const toMerge = args[i];
	        for (const key in toMerge) {
	            if (key === 'class') {
	                if (ret.class !== toMerge.class) {
	                    ret.class = normalizeClass([ret.class, toMerge.class]);
	                }
	            }
	            else if (key === 'style') {
	                ret.style = normalizeStyle([ret.style, toMerge.style]);
	            }
	            else if (isOn(key)) {
	                const existing = ret[key];
	                const incoming = toMerge[key];
	                if (existing !== incoming) {
	                    ret[key] = existing
	                        ? [].concat(existing, toMerge[key])
	                        : incoming;
	                }
	            }
	            else if (key !== '') {
	                ret[key] = toMerge[key];
	            }
	        }
	    }
	    return ret;
	}
	let isInBeforeCreate = false;
	function resolveMergedOptions(instance) {
	    const raw = instance.type;
	    const { __merged, mixins, extends: extendsOptions } = raw;
	    if (__merged)
	        return __merged;
	    const globalMixins = instance.appContext.mixins;
	    if (!globalMixins.length && !mixins && !extendsOptions)
	        return raw;
	    const options = {};
	    globalMixins.forEach(m => mergeOptions(options, m, instance));
	    mergeOptions(options, raw, instance);
	    return (raw.__merged = options);
	}
	function mergeOptions(to, from, instance) {
	    const strats = instance.appContext.config.optionMergeStrategies;
	    const { mixins, extends: extendsOptions } = from;
	    extendsOptions && mergeOptions(to, extendsOptions, instance);
	    mixins &&
	        mixins.forEach((m) => mergeOptions(to, m, instance));
	    for (const key in from) {
	        if (strats && hasOwn(strats, key)) {
	            to[key] = strats[key](to[key], from[key], instance.proxy, key);
	        }
	        else {
	            to[key] = from[key];
	        }
	    }
	}

	const publicPropertiesMap = extend(Object.create(null), {
	    $: i => i,
	    $el: i => i.vnode.el,
	    $data: i => i.data,
	    $props: i => ((process.env.NODE_ENV !== 'production') ? shallowReadonly(i.props) : i.props),
	    $attrs: i => ((process.env.NODE_ENV !== 'production') ? shallowReadonly(i.attrs) : i.attrs),
	    $slots: i => ((process.env.NODE_ENV !== 'production') ? shallowReadonly(i.slots) : i.slots),
	    $refs: i => ((process.env.NODE_ENV !== 'production') ? shallowReadonly(i.refs) : i.refs),
	    $parent: i => i.parent && i.parent.proxy,
	    $root: i => i.root && i.root.proxy,
	    $emit: i => i.emit,
	    $options: i => (__VUE_OPTIONS_API__ ? resolveMergedOptions(i) : i.type),
	    $forceUpdate: i => () => queueJob(i.update),
	    $nextTick: i => nextTick.bind(i.proxy),
	    $watch: i => (__VUE_OPTIONS_API__ ? instanceWatch.bind(i) : NOOP)
	});
	const PublicInstanceProxyHandlers = {
	    get({ _: instance }, key) {
	        const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
	        // let @vue/reactivity know it should never observe Vue public instances.
	        if (key === "__v_skip" /* SKIP */) {
	            return true;
	        }
	        // for internal formatters to know that this is a Vue instance
	        if ((process.env.NODE_ENV !== 'production') && key === '__isVue') {
	            return true;
	        }
	        // data / props / ctx
	        // This getter gets called for every property access on the render context
	        // during render and is a major hotspot. The most expensive part of this
	        // is the multiple hasOwn() calls. It's much faster to do a simple property
	        // access on a plain object, so we use an accessCache object (with null
	        // prototype) to memoize what access type a key corresponds to.
	        let normalizedProps;
	        if (key[0] !== '$') {
	            const n = accessCache[key];
	            if (n !== undefined) {
	                switch (n) {
	                    case 0 /* SETUP */:
	                        return setupState[key];
	                    case 1 /* DATA */:
	                        return data[key];
	                    case 3 /* CONTEXT */:
	                        return ctx[key];
	                    case 2 /* PROPS */:
	                        return props[key];
	                    // default: just fallthrough
	                }
	            }
	            else if (setupState !== EMPTY_OBJ && hasOwn(setupState, key)) {
	                accessCache[key] = 0 /* SETUP */;
	                return setupState[key];
	            }
	            else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
	                accessCache[key] = 1 /* DATA */;
	                return data[key];
	            }
	            else if (
	            // only cache other properties when instance has declared (thus stable)
	            // props
	            (normalizedProps = instance.propsOptions[0]) &&
	                hasOwn(normalizedProps, key)) {
	                accessCache[key] = 2 /* PROPS */;
	                return props[key];
	            }
	            else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
	                accessCache[key] = 3 /* CONTEXT */;
	                return ctx[key];
	            }
	            else if (!__VUE_OPTIONS_API__ || !isInBeforeCreate) {
	                accessCache[key] = 4 /* OTHER */;
	            }
	        }
	        const publicGetter = publicPropertiesMap[key];
	        let cssModule, globalProperties;
	        // public $xxx properties
	        if (publicGetter) {
	            if (key === '$attrs') {
	                track(instance, "get" /* GET */, key);
	                (process.env.NODE_ENV !== 'production') && markAttrsAccessed();
	            }
	            return publicGetter(instance);
	        }
	        else if (
	        // css module (injected by vue-loader)
	        (cssModule = type.__cssModules) &&
	            (cssModule = cssModule[key])) {
	            return cssModule;
	        }
	        else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
	            // user may set custom properties to `this` that start with `$`
	            accessCache[key] = 3 /* CONTEXT */;
	            return ctx[key];
	        }
	        else if (
	        // global properties
	        ((globalProperties = appContext.config.globalProperties),
	            hasOwn(globalProperties, key))) {
	            return globalProperties[key];
	        }
	        else if ((process.env.NODE_ENV !== 'production') &&
	            currentRenderingInstance &&
	            (!isString(key) ||
	                // #1091 avoid internal isRef/isVNode checks on component instance leading
	                // to infinite warning loop
	                key.indexOf('__v') !== 0)) {
	            if (data !== EMPTY_OBJ &&
	                (key[0] === '$' || key[0] === '_') &&
	                hasOwn(data, key)) {
	                warn(`Property ${JSON.stringify(key)} must be accessed via $data because it starts with a reserved ` +
	                    `character ("$" or "_") and is not proxied on the render context.`);
	            }
	            else {
	                warn(`Property ${JSON.stringify(key)} was accessed during render ` +
	                    `but is not defined on instance.`);
	            }
	        }
	    },
	    set({ _: instance }, key, value) {
	        const { data, setupState, ctx } = instance;
	        if (setupState !== EMPTY_OBJ && hasOwn(setupState, key)) {
	            setupState[key] = value;
	        }
	        else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
	            data[key] = value;
	        }
	        else if (key in instance.props) {
	            (process.env.NODE_ENV !== 'production') &&
	                warn(`Attempting to mutate prop "${key}". Props are readonly.`, instance);
	            return false;
	        }
	        if (key[0] === '$' && key.slice(1) in instance) {
	            (process.env.NODE_ENV !== 'production') &&
	                warn(`Attempting to mutate public property "${key}". ` +
	                    `Properties starting with $ are reserved and readonly.`, instance);
	            return false;
	        }
	        else {
	            if ((process.env.NODE_ENV !== 'production') && key in instance.appContext.config.globalProperties) {
	                Object.defineProperty(ctx, key, {
	                    enumerable: true,
	                    configurable: true,
	                    value
	                });
	            }
	            else {
	                ctx[key] = value;
	            }
	        }
	        return true;
	    },
	    has({ _: { data, setupState, accessCache, ctx, appContext, propsOptions } }, key) {
	        let normalizedProps;
	        return (accessCache[key] !== undefined ||
	            (data !== EMPTY_OBJ && hasOwn(data, key)) ||
	            (setupState !== EMPTY_OBJ && hasOwn(setupState, key)) ||
	            ((normalizedProps = propsOptions[0]) && hasOwn(normalizedProps, key)) ||
	            hasOwn(ctx, key) ||
	            hasOwn(publicPropertiesMap, key) ||
	            hasOwn(appContext.config.globalProperties, key));
	    }
	};
	if ((process.env.NODE_ENV !== 'production') && !false) {
	    PublicInstanceProxyHandlers.ownKeys = (target) => {
	        warn(`Avoid app logic that relies on enumerating keys on a component instance. ` +
	            `The keys will be empty in production mode to avoid performance overhead.`);
	        return Reflect.ownKeys(target);
	    };
	}
	const RuntimeCompiledPublicInstanceProxyHandlers = extend({}, PublicInstanceProxyHandlers, {
	    get(target, key) {
	        // fast path for unscopables when using `with` block
	        if (key === Symbol.unscopables) {
	            return;
	        }
	        return PublicInstanceProxyHandlers.get(target, key, target);
	    },
	    has(_, key) {
	        const has = key[0] !== '_' && !isGloballyWhitelisted(key);
	        if ((process.env.NODE_ENV !== 'production') && !has && PublicInstanceProxyHandlers.has(_, key)) {
	            warn(`Property ${JSON.stringify(key)} should not start with _ which is a reserved prefix for Vue internals.`);
	        }
	        return has;
	    }
	});
	let currentInstance = null;
	const classifyRE = /(?:^|[-_])(\w)/g;
	const classify = (str) => str.replace(classifyRE, c => c.toUpperCase()).replace(/[-_]/g, '');
	/* istanbul ignore next */
	function formatComponentName(instance, Component, isRoot = false) {
	    let name = isFunction(Component)
	        ? Component.displayName || Component.name
	        : Component.name;
	    if (!name && Component.__file) {
	        const match = Component.__file.match(/([^/\\]+)\.vue$/);
	        if (match) {
	            name = match[1];
	        }
	    }
	    if (!name && instance && instance.parent) {
	        // try to infer the name based on reverse resolution
	        const inferFromRegistry = (registry) => {
	            for (const key in registry) {
	                if (registry[key] === Component) {
	                    return key;
	                }
	            }
	        };
	        name =
	            inferFromRegistry(instance.components ||
	                instance.parent.type.components) || inferFromRegistry(instance.appContext.components);
	    }
	    return name ? classify(name) : isRoot ? `App` : `Anonymous`;
	}
	function isClassComponent(value) {
	    return isFunction(value) && '__vccOpts' in value;
	}

	const ssrContextKey = Symbol((process.env.NODE_ENV !== 'production') ? `ssrContext` : ``);

	function initCustomFormatter() {
	    if (!(process.env.NODE_ENV !== 'production') || !true) {
	        return;
	    }
	    const vueStyle = { style: 'color:#3ba776' };
	    const numberStyle = { style: 'color:#0b1bc9' };
	    const stringStyle = { style: 'color:#b62e24' };
	    const keywordStyle = { style: 'color:#9d288c' };
	    // custom formatter for Chrome
	    // https://www.mattzeunert.com/2016/02/19/custom-chrome-devtools-object-formatters.html
	    const formatter = {
	        header(obj) {
	            // TODO also format ComponentPublicInstance & ctx.slots/attrs in setup
	            if (!isObject(obj)) {
	                return null;
	            }
	            if (obj.__isVue) {
	                return ['div', vueStyle, `VueInstance`];
	            }
	            else if (isRef(obj)) {
	                return [
	                    'div',
	                    {},
	                    ['span', vueStyle, genRefFlag(obj)],
	                    '<',
	                    formatValue(obj.value),
	                    `>`
	                ];
	            }
	            else if (isReactive(obj)) {
	                return [
	                    'div',
	                    {},
	                    ['span', vueStyle, 'Reactive'],
	                    '<',
	                    formatValue(obj),
	                    `>${isReadonly(obj) ? ` (readonly)` : ``}`
	                ];
	            }
	            else if (isReadonly(obj)) {
	                return [
	                    'div',
	                    {},
	                    ['span', vueStyle, 'Readonly'],
	                    '<',
	                    formatValue(obj),
	                    '>'
	                ];
	            }
	            return null;
	        },
	        hasBody(obj) {
	            return obj && obj.__isVue;
	        },
	        body(obj) {
	            if (obj && obj.__isVue) {
	                return [
	                    'div',
	                    {},
	                    ...formatInstance(obj.$)
	                ];
	            }
	        }
	    };
	    function formatInstance(instance) {
	        const blocks = [];
	        if (instance.type.props && instance.props) {
	            blocks.push(createInstanceBlock('props', toRaw(instance.props)));
	        }
	        if (instance.setupState !== EMPTY_OBJ) {
	            blocks.push(createInstanceBlock('setup', instance.setupState));
	        }
	        if (instance.data !== EMPTY_OBJ) {
	            blocks.push(createInstanceBlock('data', toRaw(instance.data)));
	        }
	        const computed = extractKeys(instance, 'computed');
	        if (computed) {
	            blocks.push(createInstanceBlock('computed', computed));
	        }
	        const injected = extractKeys(instance, 'inject');
	        if (injected) {
	            blocks.push(createInstanceBlock('injected', injected));
	        }
	        blocks.push([
	            'div',
	            {},
	            [
	                'span',
	                {
	                    style: keywordStyle.style + ';opacity:0.66'
	                },
	                '$ (internal): '
	            ],
	            ['object', { object: instance }]
	        ]);
	        return blocks;
	    }
	    function createInstanceBlock(type, target) {
	        target = extend({}, target);
	        if (!Object.keys(target).length) {
	            return ['span', {}];
	        }
	        return [
	            'div',
	            { style: 'line-height:1.25em;margin-bottom:0.6em' },
	            [
	                'div',
	                {
	                    style: 'color:#476582'
	                },
	                type
	            ],
	            [
	                'div',
	                {
	                    style: 'padding-left:1.25em'
	                },
	                ...Object.keys(target).map(key => {
	                    return [
	                        'div',
	                        {},
	                        ['span', keywordStyle, key + ': '],
	                        formatValue(target[key], false)
	                    ];
	                })
	            ]
	        ];
	    }
	    function formatValue(v, asRaw = true) {
	        if (typeof v === 'number') {
	            return ['span', numberStyle, v];
	        }
	        else if (typeof v === 'string') {
	            return ['span', stringStyle, JSON.stringify(v)];
	        }
	        else if (typeof v === 'boolean') {
	            return ['span', keywordStyle, v];
	        }
	        else if (isObject(v)) {
	            return ['object', { object: asRaw ? toRaw(v) : v }];
	        }
	        else {
	            return ['span', stringStyle, String(v)];
	        }
	    }
	    function extractKeys(instance, type) {
	        const Comp = instance.type;
	        if (isFunction(Comp)) {
	            return;
	        }
	        const extracted = {};
	        for (const key in instance.ctx) {
	            if (isKeyOfType(Comp, key, type)) {
	                extracted[key] = instance.ctx[key];
	            }
	        }
	        return extracted;
	    }
	    function isKeyOfType(Comp, key, type) {
	        const opts = Comp[type];
	        if ((isArray(opts) && opts.includes(key)) ||
	            (isObject(opts) && key in opts)) {
	            return true;
	        }
	        if (Comp.extends && isKeyOfType(Comp.extends, key, type)) {
	            return true;
	        }
	        if (Comp.mixins && Comp.mixins.some(m => isKeyOfType(m, key, type))) {
	            return true;
	        }
	    }
	    function genRefFlag(v) {
	        if (v._shallow) {
	            return `ShallowRef`;
	        }
	        if (v.effect) {
	            return `ComputedRef`;
	        }
	        return `Ref`;
	    }
	    /* eslint-disable no-restricted-globals */
	    if (window.devtoolsFormatters) {
	        window.devtoolsFormatters.push(formatter);
	    }
	    else {
	        window.devtoolsFormatters = [formatter];
	    }
	}

	/**
	 * Actual implementation
	 */
	function renderList(source, renderItem) {
	    let ret;
	    if (isArray(source) || isString(source)) {
	        ret = new Array(source.length);
	        for (let i = 0, l = source.length; i < l; i++) {
	            ret[i] = renderItem(source[i], i);
	        }
	    }
	    else if (typeof source === 'number') {
	        if ((process.env.NODE_ENV !== 'production') && !Number.isInteger(source)) {
	            warn(`The v-for range expect an integer value but got ${source}.`);
	            return [];
	        }
	        ret = new Array(source);
	        for (let i = 0; i < source; i++) {
	            ret[i] = renderItem(i + 1, i);
	        }
	    }
	    else if (isObject(source)) {
	        if (source[Symbol.iterator]) {
	            ret = Array.from(source, renderItem);
	        }
	        else {
	            const keys = Object.keys(source);
	            ret = new Array(keys.length);
	            for (let i = 0, l = keys.length; i < l; i++) {
	                const key = keys[i];
	                ret[i] = renderItem(source[key], key, i);
	            }
	        }
	    }
	    else {
	        ret = [];
	    }
	    return ret;
	}

	function initDev() {
	    const target = getGlobalThis();
	    target.__VUE__ = true;
	    setDevtoolsHook(target.__VUE_DEVTOOLS_GLOBAL_HOOK__);
	    {
	        console.info(`You are running a development build of Vue.\n` +
	            `Make sure to use the production build (*.prod.js) when deploying for production.`);
	        initCustomFormatter();
	    }
	}

	// This entry exports the runtime only, and is built as
	(process.env.NODE_ENV !== 'production') && initDev();

	const _withId = /*#__PURE__*/withScopeId("data-v-adefeb32");

	const render = /*#__PURE__*/_withId(function render(_ctx, _cache, $props, $setup, $data, $options) {
	  return (openBlock(), createBlock("div", {
	    class: "digit-wheel__wrap",
	    style: _ctx.textStyle
	  }, [
	    (_ctx.isDigit(_ctx.digit))
	      ? (openBlock(), createBlock("div", {
	          key: 0,
	          class: "digit-wheel",
	          ref: "digitWheel",
	          id: _ctx.uuid,
	          style: _ctx.digitWheelStyle,
	          "data-digit": _ctx.digit
	        }, [
	          (openBlock(true), createBlock(Fragment, null, renderList(_ctx.digitWheel, (item) => {
	            return (openBlock(), createBlock("div", {
	              class: "digit is-digit",
	              key: item.value,
	              "data-digit": item.value,
	              style: item.style
	            }, toDisplayString(item.value), 13 /* TEXT, STYLE, PROPS */, ["data-digit"]))
	          }), 128 /* KEYED_FRAGMENT */))
	        ], 12 /* STYLE, PROPS */, ["id", "data-digit"]))
	      : (openBlock(), createBlock("div", {
	          key: 1,
	          class: ["digit", _ctx.ensureDigitClass(_ctx.digit)]
	        }, toDisplayString(_ctx.digit), 3 /* TEXT, CLASS */))
	  ], 4 /* STYLE */))
	});

	function styleInject(css, ref) {
	  if ( ref === void 0 ) ref = {};
	  var insertAt = ref.insertAt;

	  if (!css || typeof document === 'undefined') { return; }

	  var head = document.head || document.getElementsByTagName('head')[0];
	  var style = document.createElement('style');
	  style.type = 'text/css';

	  if (insertAt === 'top') {
	    if (head.firstChild) {
	      head.insertBefore(style, head.firstChild);
	    } else {
	      head.appendChild(style);
	    }
	  } else {
	    head.appendChild(style);
	  }

	  if (style.styleSheet) {
	    style.styleSheet.cssText = css;
	  } else {
	    style.appendChild(document.createTextNode(css));
	  }
	}

	var css_248z = ".digit-wheel__wrap[data-v-adefeb32]{display:inline-block;overflow:hidden}.digit-wheel__wrap[data-v-adefeb32] .digit-wheel{transform-style:preserve-3d;height:1em;width:1ch}.digit-wheel__wrap[data-v-adefeb32] .digit{line-height:1}.digit-wheel__wrap[data-v-adefeb32] .digit.is-digit{position:absolute;top:0;left:0;width:1ch}.digit-wheel__wrap[data-v-adefeb32] .digit.is-symbol{width:1ch}.digit-wheel__wrap[data-v-adefeb32] .digit.is-chinese,.digit-wheel__wrap[data-v-adefeb32] .digit.is-letter,.digit-wheel__wrap[data-v-adefeb32] .digit.is-percentage{width:1em}";
	styleInject(css_248z);

	script.render = render;
	script.__scopeId = "data-v-adefeb32";
	script.__file = "src/packages/DigitWheel.vue";

	// const el = ref<HTMLElement | null>(null)
	var script$1 = vueDemi.defineComponent({
	    name: 'DigitWheelGroup',
	    components: {
	        DigitWheel: script
	    },
	    props: {
	        digits: {
	            type: Number,
	            default: 0,
	            required: true
	        },
	        gutter: {
	            type: Number,
	            default: 0
	        },
	        format: {
	            type: String,
	            default: '0,0'
	        },
	        size: {
	            type: String,
	            default: 'base'
	        }
	    },
	    setup(props) {
	        const groupDigits = vueDemi.computed(() => {
	            let digits = numeral(props.digits).format(props.format);
	            const isEmpty = (val) => val == null || !(Object.keys(val) || val).length;
	            digits = Array.from(digits).filter((item) => !isEmpty(item));
	            return digits;
	        });
	        const colStyle = vueDemi.computed(() => {
	            return {
	                // 'grid-template-columns': `repeat(${digits.value.length}, minmax(0, 1fr))`,
	                padding: `0 ${props.gutter}px`
	            };
	        });
	        const textStyle = vueDemi.computed(() => {
	            const sizePreset = Object.prototype.hasOwnProperty.call(fontSizePreset, props.size)
	                ? fontSizePreset[props.size]
	                : props.size;
	            return {
	                fontSize: sizePreset
	            };
	        });
	        vueDemi.onMounted(() => {
	            // console.log(props)
	        });
	        vueDemi.onBeforeUpdate(() => {
	            // console.log(props)
	        });
	        vueDemi.onUpdated(() => {
	            // console.log(props)
	        });
	        return {
	            groupDigits,
	            colStyle,
	            textStyle
	        };
	    }
	});

	const _withId$1 = /*#__PURE__*/withScopeId("data-v-3b84a308");

	const render$1 = /*#__PURE__*/_withId$1(function render(_ctx, _cache, $props, $setup, $data, $options) {
	  const _component_DigitWheel = resolveComponent("DigitWheel");

	  return (openBlock(), createBlock("div", {
	    class: "digit-wheel-group",
	    style: _ctx.textStyle
	  }, [
	    (openBlock(true), createBlock(Fragment, null, renderList(_ctx.groupDigits, (digit, index) => {
	      return (openBlock(), createBlock("div", {
	        class: "digit-wheel-group__col",
	        style: _ctx.colStyle,
	        key: index
	      }, [
	        createVNode(_component_DigitWheel, mergeProps({
	          "is-group": "",
	          digit: digit,
	          index: index,
	          size: _ctx.size
	        }, _ctx.$attrs), null, 16 /* FULL_PROPS */, ["digit", "index", "size"])
	      ], 4 /* STYLE */))
	    }), 128 /* KEYED_FRAGMENT */))
	  ], 4 /* STYLE */))
	});

	var css_248z$1 = ".digit-wheel-group[data-v-3b84a308]{height:1em}.digit-wheel-group__col[data-v-3b84a308]{display:inline-block}.digit-wheel-group__col[data-v-3b84a308]:first-child{padding-left:0!important}.digit-wheel-group__col[data-v-3b84a308]:last-child{padding-right:0!important}";
	styleInject(css_248z$1);

	script$1.render = render$1;
	script$1.__scopeId = "data-v-3b84a308";
	script$1.__file = "src/packages/DigitWheelGroup.vue";

	// import SlideDirective from './SlideDirective'
	const install = (app) => {
	    app.component(script$1.name, script$1);
	    app.component(script.name, script);
	    // app.use(SlideDirective, 'slide')
	};

	exports.DigitWheel = script;
	exports.DigitWheelGroup = script$1;
	exports.default = install;
	exports.install = install;

	Object.defineProperty(exports, '__esModule', { value: true });

	return exports;

}({}, vueDemi));
