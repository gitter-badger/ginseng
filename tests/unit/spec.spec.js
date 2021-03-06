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

import * as dom from "~/src/browser/dom"
import * as style from "~/src/browser/style"

import { extract, default as Spec } from "~/src/spec"

/* ----------------------------------------------------------------------------
 * Declarations
 * ------------------------------------------------------------------------- */

/* Spec */
describe("Spec", () => {

  /* Set fixture base path */
  beforeAll(() => {
    fixture.setBase("tests/fixtures/spec")
  })

  /* Register spies */
  beforeEach(() => {
    spyOn(dom, "traverse")
      .and.returnValue("data")
    spyOn(style, "load")
      .and.returnValue("style")
  })

  /* Cleanup fixtures */
  afterEach(() => {
    fixture.cleanup()
  })

  /* #extract */
  describe("#extract", () => {

    /* Test: should return valid data */
    it("should return valid data",
      constructorShouldReturnValidData
    )
  })

  /* #constructor */
  describe("#constructor", () => {

    /* Load fixtures and register spies */
    beforeEach(() => {
      fixture.load("constructor.html")

      /* Register spies */
      spyOn(dom, "query")
        .and.returnValue(fixture.el.firstChild)
    })

    /* Test: should set name */
    it("should set name",
      constructorShouldSetName
    )

    /* Test: should set element */
    it("should set element",
      constructorShouldSetElement
    )

    /* Test: should resolve selector */
    it("should resolve selector",
      constructorShouldResolveSelector
    )

    /* Test: should initialize data */
    it("should initialize data",
      constructorShouldInitializeData
    )

    /* Test: should throw on invalid name */
    it("should throw on invalid name",
      constructorShouldThrowOnInvalidName
    )
  })

  /* #capture */
  describe("#capture", () => {

    /* Load fixtures */
    beforeEach(() => {
      fixture.load("capture.html")
    })

    /* Test: should traverse child elements */
    it("should traverse child elements",
      captureShouldTraverseChildElements
    )

    /* Test: should return data */
    it("should return data",
      captureShouldReturnData
    )

    /* Test: should set data */
    it("should set data",
      captureShouldSetData
    )
  })

  /* #compare */
  describe("#compare", () => {

    /* Load fixtures */
    beforeEach(() => {
      fixture.load("compare.html")
    })

    /* Test: should use captured data */
    it("should use captured data",
      compareShouldUseCapturedData
    )

    /* Test: should capture data if not present */
    it("should capture data if not present",
      compareShouldCaptureDataIfNotPresent
    )
  })
})

/* ----------------------------------------------------------------------------
 * Definitions: #extract
 * ------------------------------------------------------------------------- */

/* Test: #extract should return valid data */
function constructorShouldReturnValidData() {
  expect(extract(null, "children"))
    .toEqual({
      element: "style",
      pseudo: {
        before: "style",
        after: "style"
      },
      children: "children"
    })
  expect(style.load.calls.count())
    .toEqual(3)
}

/* ----------------------------------------------------------------------------
 * Definitions: #constructor
 * ------------------------------------------------------------------------- */

/* Test: #constructor should set name */
function constructorShouldSetName() {
  const name = `${+new Date}`
  const spec = new Spec(name, ".constructor")
  expect(spec.name)
    .toEqual(name)
}

/* Test: #constructor should set element */
function constructorShouldSetElement() {
  const spec = new Spec("name", ".constructor")
  expect(spec.element)
    .toEqual(fixture.el.firstChild)
}

/* Test: #constructor should resolve selector */
function constructorShouldResolveSelector() {
  new Spec("name", ".constructor")
  expect(dom.query)
    .toHaveBeenCalledWith(".constructor")
}

/* Test: #constructor should initialize data */
function constructorShouldInitializeData() {
  const spec = new Spec("name", ".constructor")
  expect(spec.data)
    .toBeNull()
}

/* Test: #constructor should throw on invalid name */
function constructorShouldThrowOnInvalidName() {
  expect(() => {
    new Spec("", ".constructor")
  }).toThrow(
    new TypeError("Invalid name: \"\""))
  expect(dom.query)
    .not.toHaveBeenCalled()
}

/* ----------------------------------------------------------------------------
 * Definitions: #capture
 * ------------------------------------------------------------------------- */

/* Test: #capture should traverse child elements */
function captureShouldTraverseChildElements() {
  new Spec("name", ".capture").capture()
  expect(dom.traverse)
    .toHaveBeenCalledWith(jasmine.any(Element), extract)
}

/* Test: #capture should return data */
function captureShouldReturnData() {
  const spec = new Spec("name", ".capture")
  expect(spec.capture()).toEqual("data")
}

/* Test: #capture should set data */
function captureShouldSetData() {
  const spec = new Spec("name", ".capture")
  expect(spec.capture()).toEqual(spec.data)
  expect(spec.data).toEqual("data")
}

/* ----------------------------------------------------------------------------
 * Definitions: #compare
 * ------------------------------------------------------------------------- */

/* Test: #compare should use captured data */
function compareShouldUseCapturedData() {
  const spec = new Spec("name", ".compare")
  spec.capture()
  expect(spec.compare(spec.data))
    .toBe(true)
  expect(dom.traverse.calls.count())
    .toEqual(1)
}

/* Test: #compare should capture data if not present */
function compareShouldCaptureDataIfNotPresent() {
  const data = new Spec("name", ".compare").capture()
  const spec = new Spec("name", ".compare")
  expect(spec.compare(data))
    .toBe(true)
  expect(dom.traverse.calls.count())
    .toEqual(2)
}
