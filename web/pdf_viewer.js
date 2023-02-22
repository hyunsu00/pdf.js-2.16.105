/* Copyright 2014 Mozilla Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { ScrollMode, SpreadMode } from "./ui_utils.js";
import { BaseViewer } from "./base_viewer.js";

class PDFViewer extends BaseViewer {
  #containerTopLeft = null;

  #resizeObserver = new ResizeObserver(this.#resizeObserverCallback.bind(this));

  constructor(options) {
    super(options);
    this.#resizeObserver.observe(this.container);
  }

  get containerTopLeft() {
    return (this.#containerTopLeft ||= [
      this.container.offsetTop,
      this.container.offsetLeft,
    ]);
  }

  #resizeObserverCallback(entries) {
    for (const entry of entries) {
      if (entry.target === this.container) {
        this.updateContainerHeightCss(
          Math.floor(entry.borderBoxSize[0].blockSize)
        );
        this.#containerTopLeft = null;
        break;
      }
    }
  }
}

class PDFSinglePageViewer extends BaseViewer {
  _resetView() {
    super._resetView();
    this._scrollMode = ScrollMode.PAGE;
    this._spreadMode = SpreadMode.NONE;
  }

  // eslint-disable-next-line accessor-pairs
  set scrollMode(mode) {}

  _updateScrollMode() {}

  // eslint-disable-next-line accessor-pairs
  set spreadMode(mode) {}

  _updateSpreadMode() {}
}

export { PDFSinglePageViewer, PDFViewer };
