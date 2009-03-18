/*global window, document, console, Test, Namespace, a */

var t = new Test.Unit.Runner({
    setup : function () {

    },

    teardown : function () {
        // Delete any global objects that were created
        delete window.a;

        // Remove script tags other than Namespace.js, namespace_test.js 
        // and unittest.js
        var tags = document.getElementsByTagName("SCRIPT"), tag;
        for (var i = 0; i < tags.length; i += 1) {
            tag = tags[i]; 
            if (tag.src.match("amespace") === null && 
                tag.src.match("unittest") === null) {
                tag.parentNode.removeChild(tag);
            }
        } 
    },

    testNamespace : function () {
        this.assert(typeof Namespace === "function");
        // Create some objects using namespace
        Namespace("a.b.c");

        this.assert(typeof a === "object");
        this.assert(typeof a.b === "object");
        this.assert(typeof a.b.c === "object");

        // Create some properties and make sure they are preserved
        a.b.foo = true;
        a.b.bar = "hello";
        Namespace("a.b.baz");

        this.assert(a.b.foo);
        this.assertIdentical(a.b.bar, "hello");
        this.assert(typeof a.b.baz === "object");
    },

    testExist : function () {
        this.assert(typeof Namespace.exist === "function");

        this.assert(!Namespace.exist("a"));

        a = {};
        a.b = function () {};
        a.b.c = "something";

        this.assert(Namespace.exist("a"));
        this.assert(Namespace.exist("a.b"));
        this.assert(Namespace.exist("a.b.c"));

        delete window.a;

        this.assert(!Namespace.exist("a"));
    },

    testMapIdentifierToUri : function () {
        this.assert(typeof Namespace.mapIdentifierToUri === "function");

        this.assertIdentical(Namespace.mapIdentifierToUri("a.b.c"), "./a/b/c.js");

        Namespace.separator = ":";

        this.assertIdentical(Namespace.mapIdentifierToUri("a:b:c"), "./a/b/c.js");

        Namespace.separator = ".";
        Namespace.baseUri = "/foo/bar/";

        this.assertIdentical(Namespace.mapIdentifierToUri("a.b.c"), "/foo/bar/a/b/c.js");
    },

    testInclude : function () {

    },

    testUse : function () {

    },

    testFrom : function () {

    },

    testProvide : function () {

    },

    testAddEventListener : function () {

    },

    testRemoveEventListener : function () {

    },

    testRegisterNativeExtensions : function () {

    }
});
