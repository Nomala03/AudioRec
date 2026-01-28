# AudioRec - Voice Journal App

A modern **React Native (Expo) Voice Recording Journal** that allows users to record, manage, search, back up, and restore voice notes locally.

Built with **TypeScript**, designed with clean UI, and structured to demonstrate real-world mobile CRUD functionality.

## Features

- **Record Voice Notes** using the device microphone
- Live Recording Timer
- Pause & Resume Recording
- Playback Support with speed controls
- Persistent Local Storage (offline-first)
- Search Voice Notes by date/time
- Delete Notes instantly
- Auto Refresh after saving or deleting
- Backup & Restore recordings locally
- Settings Screen for future customization

## Tech Stack

| Technology | Usage |
|----------|------|
| React Native | Mobile UI development |
| Expo SDK 54 | App runtime + tooling |
| TypeScript | Type-safe development |
| expo-av / expo-audio | Audio recording & playback |
| expo-file-system | File storage + backup handling |
| expo-sharing | Exporting backup files |
| AsyncStorage | Persistent metadata storage |
| React Navigation | Bottom tabs + stack navigation |

## Screens

- **Voice Journal (Home)**
- Record new voice notes
- View saved recordings
- Playback + delete options

- **Settings**
- Backup & restore tools
- Recording quality controls (future)

## Project Structure

audioRec/
│── components/
│ ├── Recorder.tsx
│ └── VoiceNoteItem.tsx
│
│── screens/
│ ├── HomeScreen.tsx
│ └── SettingsScreen.tsx
│
│── navigation/
│ ├── BottomTabs.tsx
│ └── HomeStack.tsx
│
│── utils/
│ ├── storage.ts
│ └── backup.ts
│
│── styles/
│ └── globalStyles.ts
│
│── types/
│ └── VoiceNote.ts
│
│── App.tsx
└── README.md

Getting Started

1.Clone the Repository

- bash
git clone https://github.com/your-username/audioRec.git
cd audioRec

2.Install Dependencies

npm install

3.Start the Expo Development Server

npx expo start

Scan the QR code using Expo Go or run on an emulator.

## Permissions

This app requires microphone permission:

iOS: Microphone Access

Android: RECORD_AUDIO

If permission is denied, recording will not start.

## Local Storage System

AudioRec is designed as an offline-first app.

Audio files are stored using Expo FileSystem

Metadata (date, duration, URI) is stored using AsyncStorage

Each voice note includes:

**TypeScript** 
{
  id: string;
  uri: string;
  date: string;
  duration: number;
}

## Backup & Restore
Backup

- Copies audio files into a backup folder

- Saves metadata into notes.json

- Allows exporting using device sharing options

Restore

- Reads the backup JSON file

- Restores recordings + metadata

- Rebuilds the notes list automatically

## Debugging Highlights

- During development, the project included:

- Expo SDK 54 TypeScript module fixes

- FileSystem type augmentation

- Proper cleanup of timers + recordings

- Safe handling of deprecated APIs

- Separation of storage vs UI responsibilities

## Current Limitations

- No cloud sync yet (local backup only)

- No note renaming/tags

- Pause/resume may behave differently on Android (Expo limitation)

## Future Improvements

- Firebase/ Google Drive cloud backups
- Encrypted backup files
- Add titles + categories
- Waveform visualization
- Advanced recording settings 

## Author 

Mbali Madonsela
Junior Mobile Developer — React Native • TypeScript • Expo

## License

This project is open for learning and portfolio demonstration purposes.