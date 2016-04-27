'use strict';

System.register([], function (_export, _context) {
  var _createClass, Welcome, UpperValueConverter;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      _export('Welcome', Welcome = function () {
        function Welcome() {
          _classCallCheck(this, Welcome);

          this.heading = 'Welcome to the Aurelia Navigation App!';
          this.firstName = 'John';
          this.lastName = 'Doe';
          this.previousValue = this.fullName;
        }

        Welcome.prototype.submit = function submit() {
          this.previousValue = this.fullName;
          alert('Welcome, ' + this.fullName + '!');
        };

        Welcome.prototype.canDeactivate = function canDeactivate() {
          if (this.fullName !== this.previousValue) {
            return confirm('Are you sure you want to leave?');
          }
        };

        _createClass(Welcome, [{
          key: 'fullName',
          get: function get() {
            return this.firstName + ' ' + this.lastName;
          }
        }]);

        return Welcome;
      }());

      _export('Welcome', Welcome);

      _export('UpperValueConverter', UpperValueConverter = function () {
        function UpperValueConverter() {
          _classCallCheck(this, UpperValueConverter);
        }

        UpperValueConverter.prototype.toView = function toView(value) {
          return value && value.toUpperCase();
        };

        return UpperValueConverter;
      }());

      _export('UpperValueConverter', UpperValueConverter);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlbGNvbWUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7eUJBRWEsTzs7OztlQUNYLE8sR0FBVSx3QztlQUNWLFMsR0FBWSxNO2VBQ1osUSxHQUFXLEs7ZUFDWCxhLEdBQWdCLEtBQUssUTs7OzBCQVdyQixNLHFCQUFTO0FBQ1AsZUFBSyxhQUFMLEdBQXFCLEtBQUssUUFBMUI7QUFDQSw4QkFBa0IsS0FBSyxRQUF2QjtBQUNELFM7OzBCQUVELGEsNEJBQWdCO0FBQ2QsY0FBSSxLQUFLLFFBQUwsS0FBa0IsS0FBSyxhQUEzQixFQUEwQztBQUN4QyxtQkFBTyxRQUFRLGlDQUFSLENBQVA7QUFDRDtBQUNGLFM7Ozs7OEJBYmM7QUFDYixtQkFBVSxLQUFLLFNBQWYsU0FBNEIsS0FBSyxRQUFqQztBQUNEOzs7Ozs7OztxQ0FjVSxtQjs7Ozs7c0NBQ1gsTSxtQkFBTyxLLEVBQU87QUFDWixpQkFBTyxTQUFTLE1BQU0sV0FBTixFQUFoQjtBQUNELFMiLCJmaWxlIjoid2VsY29tZS5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
