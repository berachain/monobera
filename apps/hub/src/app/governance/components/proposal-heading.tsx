import { cn } from "@bera/ui";
import { Icons } from "@bera/ui/icons";
import { getTopicColor, parseProposalBody } from "../helper";

export const ProposalHeading = ({
  frontmatter: fm,
  size,
}: {
  frontmatter: ReturnType<typeof parseProposalBody>;
  size?: "sm" | "md";
}) => {
  const Heading = size === "sm" ? "h3" : "h1";
  return (
    <>
      <p
        className={cn("text-xs flex gap-2 font-semibold capitalize leading-4")}
      >
        <p>
          {(fm.data.topics || fm.data.topic)?.map((topic: string) => (
            <span
              className="inline-block after:content-['•'] after:mx-1 last:after:hidden"
              style={{ color: getTopicColor(topic) }}
            >
              {topic}
            </span>
          ))}
        </p>
        {fm.data.forumLink && (
          <>
            <span className="text-muted-foreground">•</span>
            <a
              href={fm.data.forumLink}
              target="_blank"
              className="text-muted-foreground"
              rel="noreferrer"
            >
              View Forum Post
              <Icons.externalLink className="w-3 h-3 ml-1 align-middle inline-block" />
            </a>
          </>
        )}
      </p>
      <Heading
        className={cn(
          "mt-2 font-semibold ",
          size === "sm" && " line-clamp-1 text-base",
          size === "md" && "text-2xl",
        )}
      >
        {fm.data.title}
      </Heading>
    </>
  );
};
