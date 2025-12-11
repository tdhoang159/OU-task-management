import { useMutation } from "@tanstack/react-query";
import type { WorkspaceFormData } from "~/components/workspace/create-workspace";
import { postData } from "~/lib/fetch-util";

export const useCreateWorkspace = () => {
  return useMutation({
    mutationFn: async (data: WorkspaceFormData) => postData("/workspaces", data),
  });
};