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
declare const _default: import("vue").DefineComponent<{
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
    groupDigits: import("vue").ComputedRef<string[]>;
    colStyle: import("vue").ComputedRef<object>;
    textStyle: import("vue").ComputedRef<object>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
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