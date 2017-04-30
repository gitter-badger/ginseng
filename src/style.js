/*
 * Copyright (c) 2017 Martin Donath <martin.donath@squidfunk.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Pseudo qualifier "::before"
 *
 * @type {String} Qualifier
 */
export const PSEUDO_BEFORE = "::before"

/**
 * Pseudo qualifier "::after"
 *
 * @type {String} Qualifier
 */
export const PSEUDO_AFTER = "::after"

/**
 * Retrieve the computed properties of an element or pseudo element
 *
 * If the second argument is given,
 *
 * @param {Element} el - Element
 * @param {string?} pseudo - Pseudo qualifier
 * @return {Element} Element
 */
export const computed = (el, pseudo) => {
  if (!(el instanceof Element))
    throw new ReferenceError(`Invalid element: "${el}"`)

  /* Retrieve computed properties */
  switch (pseudo) {

    /* Handle pseudo elements */
    case PSEUDO_BEFORE:
    case PSEUDO_AFTER:
      return window.getComputedStyle(el, pseudo)

    /* Handle element */
    default:
      if (pseudo)
        throw new TypeError(`Invalid pseudo qualifier: "${pseudo}"`)
      return window.getComputedStyle(el)
  }
}
