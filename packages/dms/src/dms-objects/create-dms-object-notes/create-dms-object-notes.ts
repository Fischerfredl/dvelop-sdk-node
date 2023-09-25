import { _defaultHttpRequestFunction, HttpConfig, HttpResponse } from "../../utils/http";
import { DvelopContext } from "../../index";

/**
 * Parameters for the {@link createDmsObjectNotes}-function.
 * @category DmsObject
 */
export interface CreateDmsObjectNotesParams {
  /** ID of the repository */
  repositoryId: string;

  /** ID of the DmsObject */
  dmsObjectId: string;

  /** Text for the note */
  noteText: string;
}

/**
 * Default transform-function provided to the {@link createDmsObjectNotes}-function. See [Advanced Topics](https://github.com/d-velop/dvelop-sdk-node#advanced-topics) for more information.
 * @internal
 * @category DmsObject
 */
export function _createDmsObjectNotesDefaultTransformFunction(_: HttpResponse<any>, __: DvelopContext, ___: CreateDmsObjectNotesParams): void { } // no error indicates sucess

/**
 * Factory for the {@link createDmsObjectNotes}-function. See [Advanced Topics](https://github.com/d-velop/dvelop-sdk-node#advanced-topics) for more information.
 * @typeparam T Return type of the {@link createDmsObjectNotes}-function. A corresponding transformFunction has to be supplied.
 * @category DmsObject
 */
export function _createDmsObjectNotesFactory<T>(
  httpRequestFunction: (context: DvelopContext, config: HttpConfig) => Promise<HttpResponse>,
  transformFunction: (response: HttpResponse, context: DvelopContext, params: CreateDmsObjectNotesParams) => T
): (context: DvelopContext, params: CreateDmsObjectNotesParams) => Promise<T> {
  return async (context: DvelopContext, params: CreateDmsObjectNotesParams) => {
    const response: HttpResponse = await httpRequestFunction(context, {
      method: "POST",
      url: "/dms",
      follows: ["repo", "dmsobjectwithmapping", "notes"],
      templates: {
        "repositoryid": params.repositoryId,
        "dmsobjectid": params.dmsObjectId
      },
      data: {
        "text": params.noteText
      }
    });

    return transformFunction(response, context, params);
  };
}

/**
 * Create a note for an existing DmsObject.
 *
 * ```typescript
 * import { createDmsObjectNotes } from "@dvelop-sdk/dms";
 *
 * await createDmsObjectNotes({
 *   systemBaseUri: "https://steamwheedle-cartel.d-velop.cloud",
 *   authSessionId: "dQw4w9WgXcQ"
 * }, {
 *   repositoryId: "qnydFmqHuVo",
 *   dmsObjectId: "GDYQ3PJKrT8",
 *   noteText: "Test note"
 * });
 * ```
 *
 * @category DmsObject
 */
/* istanbul ignore next */
export async function createDmsObjectNotes(context: DvelopContext, params: CreateDmsObjectNotesParams): Promise<void> {
  return await _createDmsObjectNotesFactory(_defaultHttpRequestFunction, _createDmsObjectNotesDefaultTransformFunction)(context, params);
}
