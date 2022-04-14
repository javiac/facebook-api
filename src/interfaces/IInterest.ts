export interface IInterest {
  id: string;
  name: string;
  type: string;
  path: string[];
  lifecycle: number;
  audience_size_lower_bound: number;
  audience_size_upper_bound: number;
}
