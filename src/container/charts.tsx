import * as React from "react";

import HomepageChart from "../components/charts/homepage";

export default function ChartsContainer() {
  return (
    <div className="App">
      <h1>Test A/B</h1>

      <div>
        <HomepageChart />
      </div>
    </div>
  );
}

