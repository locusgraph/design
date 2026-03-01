import { Badge } from "@locus/components";
import { Card, CardContent, CardHeader, CardTitle } from "@locus/components";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@locus/components";

export function TableShowcase() {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold">Table</h2>

      {/* Design Notes */}
      <Card className="border-primary-600 bg-primary-900/50">
        <CardHeader>
          <CardTitle className="text-sm text-primary-300">Design Notes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• Use for structured data lists (graphs, tokens, permissions)</p>
          <p>
            • <strong>TableHead</strong> uses muted foreground for hierarchy
          </p>
          <p>• Rows have subtle hover state for scannability</p>
          <p>
            • Use <strong>TableCaption</strong> for additional context
          </p>
          <p className="pt-2 text-xs">
            Wrap in Card for consistent styling. Consider pagination for 10+ items.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Basic Table</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Agent Alpha</TableCell>
                <TableCell>
                  <Badge variant="confirm">Active</Badge>
                </TableCell>
                <TableCell>Owner</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Agent Beta</TableCell>
                <TableCell>
                  <Badge variant="secondary">Pending</Badge>
                </TableCell>
                <TableCell>Reader</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Agent Gamma</TableCell>
                <TableCell>
                  <Badge variant="destructive">Revoked</Badge>
                </TableCell>
                <TableCell>Writer</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>With Caption</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>A list of recent graphs.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Graph</TableHead>
                <TableHead>Locuses</TableHead>
                <TableHead>Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Knowledge Base</TableCell>
                <TableCell>1,234</TableCell>
                <TableCell>2 days ago</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Research Notes</TableCell>
                <TableCell>567</TableCell>
                <TableCell>1 week ago</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </section>
  );
}
