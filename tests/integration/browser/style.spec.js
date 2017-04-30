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

import * as style from "~/src/browser/style"

/* ----------------------------------------------------------------------------
 * Declarations
 * ------------------------------------------------------------------------- */

/* [Browser] */
describe("[Browser]", () => {

  /* style */
  describe("style", () => {

    /* Set fixture base path */
    beforeAll(function(){
      fixture.setBase("tests/fixtures/browser/style")
    })

    /* Cleanup fixtures */
    afterEach(function(){
      fixture.cleanup()
    })

    /* #load */
    describe("#load", () => {

      /* Load fixtures */
      beforeEach(function(){
        fixture.load("load.html")
      })

      /* Test: should return computed styles */
      it("should return computed styles for element",
        loadShouldReturnComputedStylesForElement
      )

      /* Test: should return computed styles for element before */
      it("should return computed styles for element before",
        loadShouldReturnComputedStylesForElementBefore
      )

      /* Test: should return computed styles for element after */
      it("should return computed styles for element after",
        loadShouldReturnComputedStylesForElementAfter
      )

      /* Test: should throw on invalid element */
      it("should throw on invalid element",
        loadShouldThrowOnInvalidElement
      )

      /* Test: should throw on invalid pseudo qualifier */
      it("should throw on invalid pseudo qualifier",
        loadShouldThrowOnInvalidPseudoQualifier
      )
    })
  })
})

/* ----------------------------------------------------------------------------
 * Definitions: #load
 * ------------------------------------------------------------------------- */

/* Test: #load should return computed styles for element */
function loadShouldReturnComputedStylesForElement() {
  const el = document.querySelector(".load")
  const decl = window.getComputedStyle(el)
  expect(style.load(el))
    .toEqual(Object.keys(decl).reduce((result, key) => {
      if (!/^\d+$/.test(key))
        result[key] = decl[key]
      return result
    }, {}))
}

/* Test: #load should return computed styles for element before */
function loadShouldReturnComputedStylesForElementBefore() {
  const el = document.querySelector(".load")
  const decl = window.getComputedStyle(el, "::before")
  expect(style.load(el, style.PSEUDO_BEFORE))
    .toEqual(Object.keys(decl).reduce((result, key) => {
      if (!/^\d+$/.test(key))
        result[key] = decl[key]
      return result
    }, {}))
}

/* Test: #load should return computed styles for element after */
function loadShouldReturnComputedStylesForElementAfter() {
  const el = document.querySelector(".load")
  const decl = window.getComputedStyle(el, "::after")
  expect(style.load(el, style.PSEUDO_AFTER))
    .toEqual(Object.keys(decl).reduce((result, key) => {
      if (!/^\d+$/.test(key))
        result[key] = decl[key]
      return result
    }, {}))
}

/* Test: #load should throw on invalid element */
function loadShouldThrowOnInvalidElement() {
  expect(() => {
    style.load("invalid")
  }).toThrow(
    new ReferenceError("Invalid element: \"invalid\"")
  )
}

/* Test: #load should throw on invalid pseudo qualifier */
function loadShouldThrowOnInvalidPseudoQualifier() {
  const match = document.querySelector(".load")
  expect(() => {
    style.load(match, "invalid")
  }).toThrow(
    new TypeError("Invalid pseudo qualifier: \"invalid\"")
  )
}
