/**
 * MIT License
 *
 * Copyright (c) 2026 Manolo Remiddi
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

// dsh-model-picker-augmented node half.
//
// All features live in the browser half (the "./client" export, lib/client.js):
// the searchable composer model picker and the "Model Picker" settings page.
// This file exists so the bundle patch row (cordis.patch.yml) can mount the
// package in the web profile — the client-modules scan reads the `dsh.client`
// declaration from packages mounted in the host Loader — and it deliberately
// registers nothing of its own. Keep this file: removing it breaks the mount.

export default {
  name: "dsh-model-picker-augmented",
  inject: [],
  apply(ctx) {
    // Intentionally empty — see the file comment above.
  },
}
