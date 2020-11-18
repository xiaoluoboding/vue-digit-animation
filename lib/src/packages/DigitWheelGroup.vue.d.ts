export interface DigitsProps {
    digits: number;
    size: string;
    gutter: number;
    animation: string;
    duration: number;
    stagger: boolean;
    useEase: string;
    format: string;
}
declare const _default: import("vue-demi").DefineComponent<{
    digits: {
        type: NumberConstructor;
        default: number;
        required: true;
    };
    gutter: {
        type: NumberConstructor;
        default: number;
    };
    format: {
        type: StringConstructor;
        default: string;
    };
    size: {
        type: StringConstructor;
        default: string;
    };
}, {
    groupDigits: import("vue-demi").ComputedRef<string[]>;
    colStyle: import("vue-demi").ComputedRef<object>;
    textStyle: import("vue-demi").ComputedRef<object>;
}, unknown, {}, {}, import("vue-demi").ComponentOptionsMixin, import("vue-demi").ComponentOptionsMixin, Record<string, any>, string, import("vue-demi").VNodeProps & import("vue-demi").AllowedComponentProps & import("vue-demi").ComponentCustomProps, Readonly<{
    digits: number;
    gutter: number;
    format: string;
    size: string;
} & {}>, {
    digits: number;
    gutter: number;
    format: string;
    size: string;
}>;
export default _default;
//# sourceMappingURL=DigitWheelGroup.vue?vue&type=script&lang.d.ts.map