import { StyleSheet } from "react-native";

export const colors = {
  primary: "#4F46E5",
  danger: "#DC2626",
  background: "#F9FAFB",
  card: "#FFFFFF",
  text: "#111827",
  muted: "#6B7280",
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background,
  },
  card: {
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 10,
    marginVertical: 8,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 8,
  },
  text: {
    color: colors.text,
  },
  mutedText: {
    color: colors.muted,
    fontSize: 12,
  },
});
