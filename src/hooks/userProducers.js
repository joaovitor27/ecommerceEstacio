"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var producer_tsx_1 = require("../services/producer.tsx");
function useProducers() {
    var _a = (0, react_1.useState)([]), producers = _a[0], setProducers = _a[1];
    (0, react_1.useEffect)(function () {
        var producerService = new producer_tsx_1.default();
        producerService.findAll().then(function (result) {
            setProducers(result);
        });
    }, []);
    return [producers];
}
exports.default = useProducers;
