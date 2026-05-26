"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { CompanyConfig, defaultConfig, getCompanyConfig } from "@/lib/companyConfig";

const CompanyContext = createContext<CompanyConfig>(defaultConfig);

export function CompanyProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<CompanyConfig>(defaultConfig);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const company = params.get("company");
    setConfig(getCompanyConfig(company));
  }, []);

  return (
    <CompanyContext.Provider value={config}>
      {children}
    </CompanyContext.Provider>
  );
}

export function useCompany(): CompanyConfig {
  return useContext(CompanyContext);
}
