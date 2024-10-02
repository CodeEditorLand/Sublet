import{localize as t}from"../../../../nls.js";import{Codicon as d}from"../../../../base/common/codicons.js";import{MenuId as l,registerAction2 as r}from"../../../../platform/actions/common/actions.js";import{ViewAction as n}from"../../../browser/parts/views/viewPane.js";import{ContextKeyExpr as i}from"../../../../platform/contextkey/common/contextkey.js";import"../../../../platform/instantiation/common/instantiation.js";import{ctxAllCollapsed as w,ctxFilterOnType as I,ctxFollowsCursor as p,ctxSortMode as c,IOutlinePane as o,OutlineSortOrder as a}from"./outline.js";r(class extends n{constructor(){super({viewId:o.Id,id:"outline.collapse",title:t("collapse","Collapse All"),f1:!1,icon:d.collapseAll,menu:{id:l.ViewTitle,group:"navigation",when:i.and(i.equals("view",o.Id),w.isEqualTo(!1))}})}runInView(u,e){e.collapseAll()}}),r(class extends n{constructor(){super({viewId:o.Id,id:"outline.expand",title:t("expand","Expand All"),f1:!1,icon:d.expandAll,menu:{id:l.ViewTitle,group:"navigation",when:i.and(i.equals("view",o.Id),w.isEqualTo(!0))}})}runInView(u,e){e.expandAll()}}),r(class extends n{constructor(){super({viewId:o.Id,id:"outline.followCursor",title:t("followCur","Follow Cursor"),f1:!1,toggled:p,menu:{id:l.ViewTitle,group:"config",order:1,when:i.equals("view",o.Id)}})}runInView(u,e){e.outlineViewState.followCursor=!e.outlineViewState.followCursor}}),r(class extends n{constructor(){super({viewId:o.Id,id:"outline.filterOnType",title:t("filterOnType","Filter on Type"),f1:!1,toggled:I,menu:{id:l.ViewTitle,group:"config",order:2,when:i.equals("view",o.Id)}})}runInView(u,e){e.outlineViewState.filterOnType=!e.outlineViewState.filterOnType}}),r(class extends n{constructor(){super({viewId:o.Id,id:"outline.sortByPosition",title:t("sortByPosition","Sort By: Position"),f1:!1,toggled:c.isEqualTo(a.ByPosition),menu:{id:l.ViewTitle,group:"sort",order:1,when:i.equals("view",o.Id)}})}runInView(u,e){e.outlineViewState.sortBy=a.ByPosition}}),r(class extends n{constructor(){super({viewId:o.Id,id:"outline.sortByName",title:t("sortByName","Sort By: Name"),f1:!1,toggled:c.isEqualTo(a.ByName),menu:{id:l.ViewTitle,group:"sort",order:2,when:i.equals("view",o.Id)}})}runInView(u,e){e.outlineViewState.sortBy=a.ByName}}),r(class extends n{constructor(){super({viewId:o.Id,id:"outline.sortByKind",title:t("sortByKind","Sort By: Category"),f1:!1,toggled:c.isEqualTo(a.ByKind),menu:{id:l.ViewTitle,group:"sort",order:3,when:i.equals("view",o.Id)}})}runInView(u,e){e.outlineViewState.sortBy=a.ByKind}});
