import React, { FunctionComponent } from "react";

/**
 * I want to hit PERCENTAGE of my users
 */
const PERCENTAGE_USER = 0.5; //50%
const LOCALSTORE_KEY = "shouldusetestab";
const setAnalyticsContext = (path: String) => {
  console.log("used testAB option for ", path);
};
const testAB: Map<String, FunctionComponent> = new Map();

/**
 * Configure component to be able change via test AB
 *
 * @param {String} path
 * @param {Function} Component
 */
export function testABComponent(
  path: String,
  Component: FunctionComponent<{}> | undefined
): FunctionComponent<{}> | undefined {
  if (!Component) throw Error(`Test AB component undefined for ${path}`);

  let shouldUseOption = localStorage.getItem(LOCALSTORE_KEY);
  if (shouldUseOption === null) {
    shouldUseOption = String(Math.random() <= PERCENTAGE_USER);
    localStorage.setItem(LOCALSTORE_KEY, shouldUseOption);
  }

  if (!shouldUseOption) return Component;

  /**
   * Count using some analytics tools if was used B test
   */
  function Analyticst() {
    setAnalyticsContext(path);
    return null;
  }

  return props => {
    const TestComponent: FunctionComponent<{}> | undefined = testAB.get(path);
    return (
      <React.Suspense fallback={<Analyticst />}>
        <TestComponent {...props} />
      </React.Suspense>
    );
  };
}

/**
 * Chech if some component are active as TestAB Option.
 *
 * @param {String} path
 */
export function usingTestABOption(path: String): Boolean {
  return (
    localStorage.getItem(LOCALSTORE_KEY) === "true" &&
    testAB.get(path) !== undefined
  );
}

/**
 * Add Component to be used as B option
 *
 * @param {String} path
 * @param {Function} Component
 */
export function addTestAB(
  path: String,
  Component: FunctionComponent<{}> | undefined
): void {
  testAB.set(path, Component);
}
