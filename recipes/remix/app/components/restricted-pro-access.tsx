import { Link } from "@remix-run/react";
import { CircleAlert } from "lucide-react";
import { FC } from "react";
import { Button } from "~/components/ui/button";

interface Props {
  url: string;
}

export const RestrictedProAccess: FC<Props> = ({ url }) => (
  <div className="flex h-[450px] shrink-0 items-center justify-center rounded-md border border-dashed">
    <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
      <CircleAlert />
      <h3 className="mt-4 text-lg font-semibold">Upgrade to Pro</h3>
      <p className="mb-4 mt-2 text-sm text-muted-foreground">
        This feature is available exclusively for Pro users. Upgrade now to unlock premium benefits and enhance your
        experience!
      </p>
      <div className="flex gap-5">
        <Button className="font-bold">Upgrade</Button>
        <Button>
          <Link to={url} className="font-bold" target="_blank" rel="noreferrer">
            See demo
          </Link>
        </Button>
      </div>
    </div>
  </div>
);
