/**
 * My Class
 */
export class MyClass {
  constructor() {
  }

  public static init() {
    console.log('Hi there!')
  }
}


Object.assign(window, { MyClass })