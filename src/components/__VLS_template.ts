import LiteLoading from '@/components/LiteLoading.vue'
import { __VLS_publicComponent, __VLS_internalComponent, __VLS_componentsOption, __VLS_name, HeaderNote, user, repo, focus, store, isLoading, hasContent, renderedContent } from './FluxNote.vue'

export function __VLS_template() {
let __VLS_ctx!: InstanceType<__VLS_PickNotAny<typeof __VLS_publicComponent, new () => {}>> & InstanceType<__VLS_PickNotAny<typeof __VLS_internalComponent, new () => {}>> & {}
/* Components */
let __VLS_otherComponents!: NonNullable<typeof __VLS_internalComponent extends { components: infer C}  ? C : {}> & typeof __VLS_componentsOption
let __VLS_own!: __VLS_SelfComponent<typeof __VLS_name, typeof __VLS_internalComponent & typeof __VLS_publicComponent & (new () => { $slots: typeof __VLS_slots} )>
let __VLS_localComponents!: typeof __VLS_otherComponents & Omit<typeof __VLS_own, keyof typeof __VLS_otherComponents>
let __VLS_components!: typeof __VLS_localComponents & __VLS_GlobalComponents & typeof __VLS_ctx
/* Style Scoped */
type __VLS_StyleScopedClasses = {}
let __VLS_styleScopedClasses!: __VLS_StyleScopedClasses | keyof __VLS_StyleScopedClasses | (keyof __VLS_StyleScopedClasses)[]
/* CSS variable injection */
/* CSS variable injection end */
let __VLS_resolvedLocalAndGlobalComponents!: {} &
__VLS_WithComponent<'HeaderNote', typeof __VLS_localComponents, "HeaderNote", "headerNote", "header-note"> &
__VLS_WithComponent<'RouterLink', typeof __VLS_localComponents, "RouterLink", "routerLink", "router-link"> &
__VLS_WithComponent<'LiteLoading', typeof __VLS_localComponents, "LiteLoading", "liteLoading", "lite-loading"> &
__VLS_WithComponent<'StackedNoteVue', typeof __VLS_localComponents, "StackedNoteVue", "StackedNoteVue", "StackedNoteVue">;
({} as __VLS_IntrinsicElements).main; ({} as __VLS_IntrinsicElements).main;
({} as __VLS_IntrinsicElements).div; ({} as __VLS_IntrinsicElements).div; ({} as __VLS_IntrinsicElements).div; ({} as __VLS_IntrinsicElements).div; ({} as __VLS_IntrinsicElements).div; ({} as __VLS_IntrinsicElements).div; ({} as __VLS_IntrinsicElements).div; ({} as __VLS_IntrinsicElements).div
__VLS_components.HeaderNote; __VLS_components.headerNote; __VLS_components["header-note"];
// @ts-ignore
[HeaderNote,];
({} as __VLS_IntrinsicElements).a; ({} as __VLS_IntrinsicElements).a;
({} as __VLS_IntrinsicElements).h1; ({} as __VLS_IntrinsicElements).h1
__VLS_components.RouterLink; __VLS_components.RouterLink; __VLS_components.routerLink; __VLS_components.routerLink; __VLS_components["router-link"]; __VLS_components["router-link"];
// @ts-ignore
[RouterLink, RouterLink,];
({} as __VLS_IntrinsicElements).h4; ({} as __VLS_IntrinsicElements).h4;
({} as __VLS_IntrinsicElements).em; ({} as __VLS_IntrinsicElements).em;
({} as __VLS_IntrinsicElements).img; ({} as __VLS_IntrinsicElements).img
__VLS_components.LiteLoading; __VLS_components.liteLoading; __VLS_components["lite-loading"];
// @ts-ignore
[LiteLoading,];
({} as __VLS_IntrinsicElements).p
__VLS_components.StackedNoteVue;
// @ts-ignore
[StackedNoteVue,]
{
const __VLS_0 = ({} as __VLS_IntrinsicElements)["main"]
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, {});
({} as __VLS_IntrinsicElements).main;
({} as __VLS_IntrinsicElements).main
const __VLS_2 = __VLS_1({ ...{}, class: ("flux-note repo-note content note-container"), }, ...__VLS_functionalComponentArgsRest(__VLS_1))
const __VLS_3 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2)!
{
const __VLS_4 = ({} as __VLS_IntrinsicElements)["div"]
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, {});
({} as __VLS_IntrinsicElements).div;
({} as __VLS_IntrinsicElements).div
const __VLS_6 = __VLS_5({ ...{}, class: ("note readme"), }, ...__VLS_functionalComponentArgsRest(__VLS_5))
const __VLS_7 = __VLS_pickFunctionalComponentCtx(__VLS_4, __VLS_6)!
if (__VLS_ctx.withHeader) {
{
let __VLS_8!: 'HeaderNote' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.HeaderNote : 'headerNote' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.headerNote : 'header-note' extends keyof typeof __VLS_ctx ? (typeof __VLS_ctx)['header-note'] : (typeof __VLS_resolvedLocalAndGlobalComponents)['HeaderNote']
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({ ...{}, class: ("header"), user: ((__VLS_ctx.user)), repo: ((__VLS_ctx.repo)), }));
({} as { HeaderNote: typeof __VLS_8} ).HeaderNote
const __VLS_10 = __VLS_9({ ...{}, class: ("header"), user: ((__VLS_ctx.user)), repo: ((__VLS_ctx.repo)), }, ...__VLS_functionalComponentArgsRest(__VLS_9))
const __VLS_11 = __VLS_pickFunctionalComponentCtx(__VLS_8, __VLS_10)!
}
// @ts-ignore
[withHeader, user, repo, user, repo,]
}
{
const __VLS_12 = ({} as __VLS_IntrinsicElements)["div"]
const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, {});
({} as __VLS_IntrinsicElements).div;
({} as __VLS_IntrinsicElements).div
const __VLS_14 = __VLS_13({ ...{}, class: ("repo-title-breadcrumb"), }, ...__VLS_functionalComponentArgsRest(__VLS_13))
const __VLS_15 = __VLS_pickFunctionalComponentCtx(__VLS_12, __VLS_14)!
{
const __VLS_16 = ({} as __VLS_IntrinsicElements)["a"]
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, {});
({} as __VLS_IntrinsicElements).a;
({} as __VLS_IntrinsicElements).a
const __VLS_18 = __VLS_17({ ...{ onClick: {} as any, }, }, ...__VLS_functionalComponentArgsRest(__VLS_17))
const __VLS_19 = __VLS_pickFunctionalComponentCtx(__VLS_16, __VLS_18)!
let __VLS_20 = { 'click': __VLS_pickEvent(__VLS_19.emit!, 'click' as const, __VLS_componentProps(__VLS_17, __VLS_18).onClick) }
__VLS_20 = {
click: (__VLS_ctx.focus)
};
(__VLS_ctx.repo)
}
}
{
const __VLS_21 = ({} as __VLS_IntrinsicElements)["div"]
const __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, {});
({} as __VLS_IntrinsicElements).div;
({} as __VLS_IntrinsicElements).div
const __VLS_23 = __VLS_22({ ...{}, class: ("repo-title"), }, ...__VLS_functionalComponentArgsRest(__VLS_22))
const __VLS_24 = __VLS_pickFunctionalComponentCtx(__VLS_21, __VLS_23)!
{
const __VLS_25 = ({} as __VLS_IntrinsicElements)["h1"]
const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, {});
({} as __VLS_IntrinsicElements).h1;
({} as __VLS_IntrinsicElements).h1
const __VLS_27 = __VLS_26({ ...{}, class: ("title is-1"), }, ...__VLS_functionalComponentArgsRest(__VLS_26))
const __VLS_28 = __VLS_pickFunctionalComponentCtx(__VLS_25, __VLS_27)!
{
let __VLS_29!: 'RouterLink' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.RouterLink : 'routerLink' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.routerLink : 'router-link' extends keyof typeof __VLS_ctx ? (typeof __VLS_ctx)['router-link'] : (typeof __VLS_resolvedLocalAndGlobalComponents)['RouterLink']
const __VLS_30 = __VLS_asFunctionalComponent(__VLS_29, new __VLS_29({ ...{ onClick: {} as any, }, to: (({ name: 'FluxNoteView', params: { user: __VLS_ctx.user, repo: __VLS_ctx.repo } })), }));
({} as { RouterLink: typeof __VLS_29} ).RouterLink;
({} as { RouterLink: typeof __VLS_29} ).RouterLink
const __VLS_31 = __VLS_30({ ...{ onClick: {} as any, }, to: (({ name: 'FluxNoteView', params: { user: __VLS_ctx.user, repo: __VLS_ctx.repo } })), }, ...__VLS_functionalComponentArgsRest(__VLS_30))
const __VLS_32 = __VLS_pickFunctionalComponentCtx(__VLS_29, __VLS_31)!
let __VLS_33 = { 'click': __VLS_pickEvent(__VLS_32.emit!, 'click' as const, __VLS_componentProps(__VLS_30, __VLS_31).onClick) }
__VLS_33 = {
click: (__VLS_ctx.resetStackedNotes)
};
(__VLS_ctx.repo)
}
}
{
const __VLS_34 = ({} as __VLS_IntrinsicElements)["h4"]
const __VLS_35 = __VLS_asFunctionalComponent(__VLS_34, {});
({} as __VLS_IntrinsicElements).h4;
({} as __VLS_IntrinsicElements).h4
const __VLS_36 = __VLS_35({ ...{}, class: ("subtitle is-4"), }, ...__VLS_functionalComponentArgsRest(__VLS_35))
const __VLS_37 = __VLS_pickFunctionalComponentCtx(__VLS_34, __VLS_36)!
{
const __VLS_38 = ({} as __VLS_IntrinsicElements)["em"]
const __VLS_39 = __VLS_asFunctionalComponent(__VLS_38, {});
({} as __VLS_IntrinsicElements).em;
({} as __VLS_IntrinsicElements).em
const __VLS_40 = __VLS_39({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_39))
const __VLS_41 = __VLS_pickFunctionalComponentCtx(__VLS_38, __VLS_40)!;
(__VLS_ctx.user)
}
{
const __VLS_42 = ({} as __VLS_IntrinsicElements)["img"]
const __VLS_43 = __VLS_asFunctionalComponent(__VLS_42, {});
({} as __VLS_IntrinsicElements).img
const __VLS_44 = __VLS_43({ ...{}, src: ("@/assets/icons/offline.svg"), alt: ("ofline"), }, ...__VLS_functionalComponentArgsRest(__VLS_43))
const __VLS_45 = __VLS_pickFunctionalComponentCtx(__VLS_42, __VLS_44)!
__VLS_directiveFunction(__VLS_ctx.vShow)((__VLS_ctx.store.isReadmeOffline))
}
{
const __VLS_46 = ({} as __VLS_IntrinsicElements)["img"]
const __VLS_47 = __VLS_asFunctionalComponent(__VLS_46, {});
({} as __VLS_IntrinsicElements).img
const __VLS_48 = __VLS_47({ ...{}, src: ("@/assets/icons/online.svg"), alt: ("ofline"), }, ...__VLS_functionalComponentArgsRest(__VLS_47))
const __VLS_49 = __VLS_pickFunctionalComponentCtx(__VLS_46, __VLS_48)!
__VLS_directiveFunction(__VLS_ctx.vShow)((!__VLS_ctx.store.isReadmeOffline))
}
}
}
{
let __VLS_50!: 'Slot' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.Slot : 'slot' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.slot : (typeof __VLS_resolvedLocalAndGlobalComponents)['slot']
const __VLS_51 = __VLS_asFunctionalComponent(__VLS_50, new __VLS_50({ ...{}, }))
const __VLS_52 = __VLS_51({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_51))
var __VLS_53 = {}
}
if (__VLS_ctx.isLoading) {
{
let __VLS_54!: 'LiteLoading' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.LiteLoading : 'liteLoading' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.liteLoading : 'lite-loading' extends keyof typeof __VLS_ctx ? (typeof __VLS_ctx)['lite-loading'] : (typeof __VLS_resolvedLocalAndGlobalComponents)['LiteLoading']
const __VLS_55 = __VLS_asFunctionalComponent(__VLS_54, new __VLS_54({ ...{}, }));
({} as { LiteLoading: typeof __VLS_54} ).LiteLoading
const __VLS_56 = __VLS_55({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_55))
const __VLS_57 = __VLS_pickFunctionalComponentCtx(__VLS_54, __VLS_56)!
}
// @ts-ignore
[focus, repo, user, repo, user, repo, resetStackedNotes, repo, user, store, store, isLoading,]
}
else if (!__VLS_ctx.hasContent) {
{
const __VLS_58 = ({} as __VLS_IntrinsicElements)["div"]
const __VLS_59 = __VLS_asFunctionalComponent(__VLS_58, {});
({} as __VLS_IntrinsicElements).div;
({} as __VLS_IntrinsicElements).div
const __VLS_60 = __VLS_59({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_59))
const __VLS_61 = __VLS_pickFunctionalComponentCtx(__VLS_58, __VLS_60)!
}
// @ts-ignore
[hasContent,]
}
else if (__VLS_ctx.withContent) {
{
const __VLS_62 = ({} as __VLS_IntrinsicElements)["p"]
const __VLS_63 = __VLS_asFunctionalComponent(__VLS_62, {});
({} as __VLS_IntrinsicElements).p
const __VLS_64 = __VLS_63({ ...{}, class: ("note-display"), }, ...__VLS_functionalComponentArgsRest(__VLS_63))
const __VLS_65 = __VLS_pickFunctionalComponentCtx(__VLS_62, __VLS_64)!
__VLS_directiveFunction(__VLS_ctx.vHtml)((__VLS_ctx.renderedContent))
}
// @ts-ignore
[withContent, renderedContent,]
}
}
for (const [stackedNote, index] of __VLS_getVForSourceType((__VLS_ctx.stackedNotes)!)) {
{
let __VLS_66!: 'StackedNoteVue' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.StackedNoteVue : (typeof __VLS_resolvedLocalAndGlobalComponents)['StackedNoteVue']
const __VLS_67 = __VLS_asFunctionalComponent(__VLS_66, new __VLS_66({ ...{}, key: ((stackedNote)), class: ("note"), index: ((index)), sha: ((stackedNote)), user: ((__VLS_ctx.user)), repo: ((__VLS_ctx.repo)), title: ((__VLS_ctx.titles[stackedNote ?? ''])), }));
({} as { StackedNoteVue: typeof __VLS_66} ).StackedNoteVue
const __VLS_68 = __VLS_67({ ...{}, key: ((stackedNote)), class: ("note"), index: ((index)), sha: ((stackedNote)), user: ((__VLS_ctx.user)), repo: ((__VLS_ctx.repo)), title: ((__VLS_ctx.titles[stackedNote ?? ''])), }, ...__VLS_functionalComponentArgsRest(__VLS_67))
const __VLS_69 = __VLS_pickFunctionalComponentCtx(__VLS_66, __VLS_68)!
}
// @ts-ignore
[stackedNotes, user, repo, titles, user, repo, titles,]
}
}
if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
}
var __VLS_slots!: {
default?(_: typeof __VLS_53): any
}
return __VLS_slots
}
