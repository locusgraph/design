import { Button } from "@locus/components";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@locus/components";

export function CardShowcase() {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold">Card</h2>

      {/* Design Notes */}
      <Card className="border-primary-600 bg-primary-900/50">
        <CardHeader>
          <CardTitle className="text-sm text-primary-300">Design Notes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• Cards group related content with visual hierarchy</p>
          <p>
            • Use <strong>CardHeader</strong> for title and optional description
          </p>
          <p>
            • Use <strong>CardAction</strong> for header-level actions
          </p>
          <p>
            • Use <strong>CardFooter</strong> for form buttons or secondary actions
          </p>
          <p className="pt-2 text-xs">Keep card content focused. One primary purpose per card.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Basic Card</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            This is a basic card with header and content.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Card with Description</CardTitle>
          <CardDescription>This is a description below the title.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Card content goes here.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Card with Action</CardTitle>
          <CardAction>
            <Button size="sm" variant="secondary">
              Action
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            This card has an action button in the header.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Card with Footer</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Content above the footer.</p>
        </CardContent>
        <CardFooter className="gap-2">
          <Button variant="secondary">Cancel</Button>
          <Button>Save</Button>
        </CardFooter>
      </Card>
    </section>
  );
}
