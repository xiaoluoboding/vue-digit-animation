export interface DigitProps {
    digit: number;
    size: string;
    animation: string;
    duration: number;
    stagger: boolean;
    useEase: string;
    format: string;
}
declare const _default: import("vue").DefineComponent<{
    digit: {
        type: NumberConstructor;
        default: number;
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
    digits: import("vue").ComputedRef<string[]>;
    gyroStyle: import("vue").ComputedRef<object>;
    textStyle: import("vue").ComputedRef<object>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    digit: number;
    gutter: number;
    format: string;
    size: string;
} & {}>, {
    digit: number;
    gutter: number;
    format: string;
    size: string;
}>;
export default _default;
//# sourceMappingURL=DigitalGyro.vue?vue&type=script&lang.d.ts.map