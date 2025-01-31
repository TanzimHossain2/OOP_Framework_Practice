function MinLength(min: number = 3) {
  return function (target: any, propertyKey: string) {
    let value: string = '';

    Object.defineProperty(target, propertyKey, {
      get() {
        return value;
      },

      set(newValue: string) {
        if (newValue.length < min) {
          throw new Error(`${propertyKey} must be at least ${min} characters`);
        }
        value = newValue;
      },
    });
  };
}

function MaxLength(max: number = 10) {
  return function (target: any, propertyKey: string) {
    let value: string = '';

    Object.defineProperty(target, propertyKey, {
      get() {
        return value;
      },

      set(newValue: string) {
        if (newValue.length > max) {
          throw new Error(`${propertyKey} must be at most ${max} characters`);
        }
        value = newValue;
      },
    });
  };
}

function Required(target: any, propertyKey: string) {
  let value: string = '';

  Object.defineProperty(target, propertyKey, {
    get() {
      return value;
    },

    set(newValue: string) {
      if (!newValue) {
        throw new Error(`${propertyKey} is required`);
      }
      value = newValue;
    },
  });
}

class User {
  @MinLength(4)
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

const user = new User('john Doe');
console.log(user.name);

