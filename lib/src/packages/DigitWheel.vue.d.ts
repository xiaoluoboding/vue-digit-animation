import { PropType } from 'vue-demi';
export interface DigitProps {
    digit: number;
    size: string;
    animation: string;
    duration: number;
    useEase: string;
}
declare const _default: import("vue-demi").DefineComponent<{
    digit: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
    index: {
        type: NumberConstructor;
        default: number;
    };
    size: {
        type: StringConstructor;
        default: string;
    };
    animation: {
        type: PropType<"default" | "wheel" | "countup">;
        default: string;
    };
    duration: {
        type: NumberConstructor;
        default: number;
    };
    stagger: {
        type: BooleanConstructor;
        default: boolean;
    };
    useEase: {
        type: PropType<"Linear" | "Ease">;
        default: string;
    };
    isGroup: {
        type: BooleanConstructor;
        default: boolean;
    };
}, unknown, {
    uuid: string;
    digitHeight: number;
    showRange: (string | number)[];
}, {
    digitWheel(): object;
    digitWheelStyle(): object;
    textStyle(): object;
}, {
    isNumber(val: number): boolean;
    isDigit(val: string): boolean;
    getTanFromDegrees(degrees: number): number;
    ensureDigitClass(val: string): "is-letter" | "is-chinese" | "is-percentage" | "is-digit" | "is-symbol";
    getDigitHeight(): void;
}, import("vue-demi").ComponentOptionsMixin, import("vue-demi").ComponentOptionsMixin, Record<string, any>, string, import("vue-demi").VNodeProps & import("vue-demi").AllowedComponentProps & import("vue-demi").ComponentCustomProps, Readonly<{
    digit: string | number;
    index: number;
    size: string;
    animation: "default" | "wheel" | "countup";
    duration: number;
    stagger: boolean;
    useEase: "Linear" | "Ease";
    isGroup: boolean;
} & {}>, {
    digit: string | number;
    index: number;
    size: string;
    animation: "default" | "wheel" | "countup";
    duration: number;
    stagger: boolean;
    useEase: "Linear" | "Ease";
    isGroup: boolean;
}>;
export default _default;
//# sourceMappingURL=DigitWheel.vue?vue&type=script&lang.d.ts.map