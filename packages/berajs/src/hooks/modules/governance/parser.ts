import { ProposalSelectionFragment } from "@bera/graphql/governance";
import graymatter from "gray-matter";

const parseLegacyBody = (
  s: string,
): { type: string | null; title: string; content: string } => {
  const pattern = /#(?:([\w-]+)# )?(.+)\n([\s\S]*)/;
  const match = s.match(pattern);

  if (match) {
    const type = match[1] || null;
    const title = match[2];
    const content = match[3].replace("\n", "<br />");
    return {
      type,
      title,
      content,
    };
  }

  throw new Error("Invalid proposal body");
};

export const parseProposalBody = (
  proposal?: Pick<ProposalSelectionFragment, "description">,
): graymatter.GrayMatterFile<string> & {
  isFrontMatter: boolean;
} => {
  if (!proposal) {
    return {
      isFrontMatter: false,
      data: { title: "Loading..." },
      content: "",
      matter: "",
      language: "",
      orig: "",
      stringify: () => "",
    };
  }

  const body = proposal?.description ?? "";

  if (graymatter.test(body)) {
    return { ...graymatter(body), isFrontMatter: true };
  }

  try {
    const legacyBody = parseLegacyBody(body);

    return {
      isFrontMatter: false,
      data: { title: legacyBody.title },
      content: legacyBody.content,
      matter: "",
      language: "",
      orig: body,
      stringify: () => body,
    };
  } catch (error) {
    return {
      isFrontMatter: false,
      data: {
        title: proposal?.description?.split("\n")[0].slice(0, 100),
      },
      content: body,
      matter: "",
      language: "",
      orig: body,
      stringify: () => body,
    };
  }
};
