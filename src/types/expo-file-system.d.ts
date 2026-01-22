declare module "expo-file-system" {
  export const documentDirectory: string | null;

  export function writeAsStringAsync(
    fileUri: string,
    contents: string,
    options?: {
      encoding?: "utf8" | "base64";
    }
  ): Promise<void>;

  export function readAsStringAsync(
    fileUri: string,
    options?: {
      encoding?: "utf8" | "base64";
    }
  ): Promise<string>;

  export function getInfoAsync(
    fileUri: string
  ): Promise<{ exists: boolean }>;

  export function makeDirectoryAsync(
    fileUri: string,
    options?: { intermediates?: boolean }
  ): Promise<void>;

  export function deleteAsync(
    fileUri: string,
    options?: { idempotent?: boolean }
  ): Promise<void>;

  export function moveAsync(options: {
    from: string;
    to: string;
  }): Promise<void>;
}
