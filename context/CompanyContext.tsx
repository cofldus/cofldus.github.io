"use client";

import { createContext, useContext, useSyncExternalStore } from "react";
import { CompanyConfig, defaultConfig, getCompanyConfig } from "@/lib/companyConfig";

const CompanyContext = createContext<CompanyConfig>(defaultConfig);

// URL 쿼리(?company=)는 페이지 수명 동안 바뀌지 않으므로 구독할 이벤트가 없다.
const subscribe = () => () => {};
const readCompany = () => new URLSearchParams(window.location.search).get("company");
const readServer = () => null;

export function CompanyProvider({ children }: { children: React.ReactNode }) {
  const company = useSyncExternalStore(subscribe, readCompany, readServer);
  return (
    <CompanyContext.Provider value={getCompanyConfig(company)}>
      {children}
    </CompanyContext.Provider>
  );
}

export function useCompany(): CompanyConfig {
  return useContext(CompanyContext);
}
