import { cn } from "@bera/ui";
import { Icons } from "@bera/ui/icons";
import { getTopicColor, parseProposalBody } from "../helper";
import { useGovernance } from "../[genre]/components/governance-provider";
import { ProposalSelectionFragment } from "@bera/graphql/governance";

export const ProposalHeading = ({
  proposal,
  size,
}: {
  proposal: ProposalSelectionFragment;
  size?: "sm" | "md";
}) => {
  const Heading = size === "sm" ? "h3" : "h1";

  const { currentTopic } = useGovernance();

  const isLinkVerified = proposal.unverifiedForumLink?.startsWith(
    currentTopic.forumLink,
  );

  return (
    <>
      {size === "md" && (proposal.topics || isLinkVerified) && (
        <div
          className={cn(
            "text-xs flex gap-2 font-semibold capitalize leading-4",
          )}
        >
          <p>
            {proposal.topics?.map((topic: string, idx: number) => (
              <span
                key={idx}
                className="inline-block after:content-['•'] after:mx-1 last:after:hidden"
                style={{ color: getTopicColor(topic) }}
              >
                {topic}
              </span>
            ))}
          </p>
          {isLinkVerified && (
            <>
              <span className="text-muted-foreground">•</span>
              <a
                href={proposal.unverifiedForumLink!}
                target="_blank"
                className="text-muted-foreground"
                rel="noreferrer"
              >
                View Forum Post
                <Icons.externalLink className="w-3 h-3 ml-1 align-middle inline-block" />
              </a>
            </>
          )}
        </div>
      )}
      <Heading
        className={cn(
          "first:mt-0  mt-1 md:mt-2 font-semibold ",
          size === "sm" && " line-clamp-1 text-base hyphens-auto max-w-full",
          size === "md" && "text-2xl",
        )}
      >
        {proposal.title}
      </Heading>
    </>
  );
};
