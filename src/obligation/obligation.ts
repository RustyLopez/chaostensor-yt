/**
 *
 *
 * The distinction between inherited value and inherited obligation matters when defining type unions.
 *
 * When defining a type union, typically there is an OBLIGATION common to all members of the union, rather than a value.
 *
 * When you declare a class as a member of a type union, you are taking on the burden of guaranteeing you can meet the obligations of that type union. You have
 * a burden. In fulfilling that burden, you allow the calling code to be implementation agnostic. The savings is on the consumption side which will typically be
 * more numerous than the type union membership side.
 *
 *
 * NOTE that just because two interfaces define the same method name and signature, does NOT mean they are conceptually the same...
 *   If interfaces do not explicitly declare they are conceptually same through interface extension, they should not be assumed to be the same.
 *
 *
 */

interface KeyBinding {
  select(): string;
}

abstract class KeyBindingTemplate implements KeyBinding {
  default = 'W';

  select(): string {
    return this.default;
  }
}

interface AppleSelectorStrategy {
  select(): string;
}

abstract class AppleSelectorStrategyTemplate {
  default = 'Honey Crisp';

  select(): string {
    return this.default;
  }
}

class InvalidTypeUnionMember implements KeyBinding, AppleSelectorStrategy {
  select(): string {
    throw new Error(
      'This method cannot actually satisfy the conceptual obligations of all declared type union memberships, without being aware of the code that is calling it and why. Services should never be coupled to their clients or invocation contexts.'
    );
  }
}
