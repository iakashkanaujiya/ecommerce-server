"use strict";

/**
 * 
 * @param {*} fun 
 * @description Handle the Async request
 */
export const asyncHandler = (fun) => (req, res, next) => {
    Promise.resolve(fun(req, res, next)).catch(next);
};