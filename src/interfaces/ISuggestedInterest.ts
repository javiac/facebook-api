export interface ISuggestedInterest {
  id: string;
  name: string;
  audience_size: number;
  path: string[];
  description: string | null;
}
