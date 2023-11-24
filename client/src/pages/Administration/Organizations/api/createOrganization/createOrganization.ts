import $api from "@/http";

interface OrganizationParams {
  organization_params: {
    bin: string;
    official_name: string;
    official_address: string;
    fact_address: string;
  };
  organization_type: string[];
}

export const createOrganization = (data: OrganizationParams) => {
  return $api.post(`/administration/organization/create`, data);
};
