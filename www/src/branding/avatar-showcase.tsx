import { Avatar, AvatarFallback, AvatarImage } from "@locus/components";
import { Card, CardContent, CardHeader, CardTitle } from "@locus/components";

export function AvatarShowcase() {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold">Avatar</h2>

      {/* Design Notes */}
      <Card className="border-primary-600 bg-primary-900/50">
        <CardHeader>
          <CardTitle className="text-sm text-primary-300">Design Notes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>
            • Always provide a <strong>Fallback</strong> for missing images
          </p>
          <p>• Use initials (1-2 chars) for fallback text</p>
          <p>
            • Default size is <code>size-10</code> (40px)
          </p>
          <p>• For groups, use negative margin to stack</p>
          <p className="pt-2 text-xs">
            Circular shape is standard. Fallback uses muted background.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>With Image</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="User" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src="https://github.com/vercel.png" alt="Vercel" />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Fallback Only</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-4">
          <Avatar>
            <AvatarFallback>AG</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>MK</AvatarFallback>
          </Avatar>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sizes</CardTitle>
        </CardHeader>
        <CardContent className="flex items-end gap-4">
          <Avatar className="size-6">
            <AvatarFallback className="text-xs">XS</AvatarFallback>
          </Avatar>
          <Avatar className="size-8">
            <AvatarFallback className="text-xs">SM</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>MD</AvatarFallback>
          </Avatar>
          <Avatar className="size-14">
            <AvatarFallback>LG</AvatarFallback>
          </Avatar>
          <Avatar className="size-20">
            <AvatarFallback className="text-xl">XL</AvatarFallback>
          </Avatar>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Avatar Group</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex -space-x-3">
            <Avatar className="border-2 border-background">
              <AvatarFallback>A1</AvatarFallback>
            </Avatar>
            <Avatar className="border-2 border-background">
              <AvatarFallback>A2</AvatarFallback>
            </Avatar>
            <Avatar className="border-2 border-background">
              <AvatarFallback>A3</AvatarFallback>
            </Avatar>
            <Avatar className="border-2 border-background">
              <AvatarFallback className="bg-muted text-muted-foreground">+5</AvatarFallback>
            </Avatar>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
