import"../../../platform/log/common/log.js";import"../../../base/common/uri.js";import{ExtHostLoggerService as g}from"../common/extHostLoggerService.js";import{Schemas as t}from"../../../base/common/network.js";import{SpdLogLogger as i}from"../../../platform/log/node/spdlogLog.js";import{generateUuid as L}from"../../../base/common/uuid.js";class h extends g{doCreateLogger(e,o,r){return e.scheme===t.file?new i(r?.name||L(),e.fsPath,!r?.donotRotate,!!r?.donotUseFormatters,o):super.doCreateLogger(e,o,r)}registerLogger(e){super.registerLogger(e),this._proxy.$registerLogger(e)}deregisterLogger(e){super.deregisterLogger(e),this._proxy.$deregisterLogger(e)}}export{h as ExtHostLoggerService};
