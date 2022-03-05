# Firebase Migration CLI

CLI for migration Firebase projects.

## Setup

```bash
$ yarn install
```

## Available commands

For list of all available commands please run from your command line:

```bash
$ node index.js --help
index.js <command>

Commands:
  index.js importDatabase      Import Realtime Database backup
  index.js importFirestore     Import Firestore backup
  index.js deleteAllAuthUsers  Delete all authenticated users

Options:
  --version  Show version number                                       [boolean]
  --help     Show help                                                 [boolean]
```

### importDatabase

Import Realtime Database backups.

```
$ node index.js importDatabase --help
index.js importDatabase

Import realtime Database backup

Options:
  --version      Show version number                                                       [boolean]
  --help         Show help                                                                 [boolean]
  --databaseUrl  Firebase database URL                                                    [required]
  --authSecret   Firebase database AUTH SECRET                                            [required]
  --backupsDir   backups location                                                         [required]
  --logsDir      logs location                                                     [default: "/tmp"]
  --throttle     throttle import requests in seconds                                   [default: 30]
  --merge        merge with the existing database instead                 [boolean] [default: false]
```

#### Required arguments

- databaseURL - you can get it from firebase console database section. URL should be without trailing forward slash.
- authSecret - you can get by visiting the [Database settings page](https://console.firebase.google.com/project/_/settings/database).
- backupsDir - absolute path to backups folder

**IMPORTANT!** When importing multiple chunks you must pass `--merge`. Otherwise each chunk will overwrite previous chunk data.

#### Backups

- Each backup file must be named after the collection it contains entries for. The import command will use it to identify target collection.

  ```
  collectionName.all.json
  ```

- Backups can be split into multiple chunks. Each file will be imported starting from chunk1.

  **IMPORTANT!** When importing multiple chunks you must pass `--merge` flag when calling import script. Otherwise each chunk will overwrite previous chunk data.

  ```
  collectionName.chunk1.json
  collectionName.chunk2.json
  ...
  collectionName.chunkN.json
  ```

- Each file must contain only single collection entries.
  ```
  {
      "REF_ID": { "some_data": "here" }
  }
  ```

Each backup is imported using CURL request from the command line. Each CURL

To read more about used CURL command please read the official [Restoring from backups](https://firebase.google.com/docs/database/backups#restoring_from_backups) guide.

#### Example usage

```
$ node index.js importDatabase --databaseUrl https://dev-bunch.firebaseio.com --authSecret 17298569182709s8ad09f889172380as8 --backupsDir /Volumes/Bunch/_backups/2020-03-25T06_55_14Z_z1-rumble_data/
Database URL:                 https://dev-bunch.firebaseio.com
Backups source:               /Volumes/Bunch/_backups/2020-03-25T06_55_14Z_z1-rumble_data/
Logfile:                      /tmp/db_import.1585601978.623.log
Request throttle:             30000 ms
Import method:                REPLACE
Backup files found:
 agoraPresence.chunk1.json
 appsFlyerIds.chunk1.json
 authToken.chunk1.json
 cmd.chunk1.json
 contacts.chunk1.json
 gameUsers.chunk1.json
 presence.chunk1.json
 pushTokens.chunk1.json
 receivedNotifications.chunk1.json
 recentlyPlayed.chunk1.json
 roomCurrentGame.chunk1.json
 roomMembers.chunk1.json
 userGames.chunk1.json
 userRoom.chunk1.json
 userSession.chunk1.json
 userSettings.chunk1.json
 usernames.index.json
 users.chunk1.json
(18 files)

? Import all backup files? (y/N)
```

An example backup file for _agoraPresence_ collection:

```
// file: agoraPresence.chunk1.json
{
  "0t7SILWJsLYISogGYOazQSKWGKo1": {
    "roomId": "XnJP4g0Gi",
    "streamId": 1.000022119e9
  },
  "5uzrzcD0biN1r2ZdTmZsofzAxlx1": {
    "roomId": "L37c0MvwO",
    "streamId": 1.000069917e9
  }
}
```

### importFirestore

Import Firestore Database backups.

```
$ node index.js importFirestore --help
index.js importFirestore

Import Firestore backup

Options:
  --version         Show version number                                                    [boolean]
  --help            Show help                                                              [boolean]
  --serviceAccount  path to firebase admin-sdk service account JSON file                  [required]
  --backupsDir      backups location                                                      [required]
  --logsDir         logs location                                                  [default: "/tmp"]
  --throttle        throttle import requests in seconds                        [number] [default: 2]
  --dryRun          just do a dry run and do NOT import anything          [boolean] [default: false]
```

#### Required arguments

- serviceAccount - path to Firebase "service account" configuration JSON file. You can aquire this file from Firebase cosole. Please read [Initialize the SDK](https://firebase.google.com/docs/database/admin/start#initialize-sdk) for more instructions.
- backupsDir - absolute path to backups folder

#### Backups

- Each backup file must be named after the collection it contains entries for. The import command will use it to identify target collection.

  ```
  collectionName.all.json
  ```

- Backups can be split into multiple chunks. Each file will be imported starting from chunk1.

  ```
  collectionName.chunk1.json
  collectionName.chunk2.json
  ...
  collectionName.chunkN.json
  ```

- Each file must contain only single collection entries.
  ```
  {
      "REF_ID": { "some_data": "here" }
  }
  ```

Each backup is imported using "firebase-admin" SDK. Collection documents are imported with `{merge: true}` flag in batches of 500 entries each.

For more details please read [Move historical data to Cloud Firestore](https://firebase.google.com/docs/firestore/firestore-for-rtdb) official guide.

#### Example usage

```
$ node index.js importFirestore --serviceAccount config/dev-bunch-firebase-adminsdk-dtmtb-64f71ec8d5.json --backupsDir /Volumes/Bunch/_backups/2020-03-25T06_55_14Z_z1-rumble_data/numbers/

Firebase project:            dev-bunch
Backups source:               /Volumes/Bunch/_backups/2020-03-25T06_55_14Z_z1-rumble_data/numbers/
Logfile:                      /tmp/fs_import.1585604958.215.log
Request throttle:             2000 ms
Backup files found:
 numbers.chunk1.json
 numbers.chunk2.json
 numbers.chunk3.json
 numbers.chunk4.json
 numbers.chunk5.json
 numbers.chunk6.json
 numbers.chunk7.json
 numbers.chunk8.json
 numbers.chunk9.json
 numbers.chunk10.json
(10 files)

? Import all backup files? (y/N)
```

An example backup file for _numbers_ collection:

```
// file: numbers.chunk1.json
{
    "+12012333468":{"contacts":{"FcIbAp9KZEQHNhqaxxlV4GERNtd2":true}},
    "+12017795878":{"contacts":{"GgdGYOZ1nyc5vG8fRkL5tC5QCv22":true}}
}
```

### deleteAllAuthUsers

Delete all authenticated users.

WARNING! Be careful when using this command. Please backup Authentication Users using Firebase CLI auth:export before use.

```
$ node index.js deleteAllAuthUsers --help
index.js deleteAllAuthUsers

Delete all authenticated users

Options:
  --version         Show version number                                                    [boolean]
  --help            Show help                                                              [boolean]
  --serviceAccount  path to firebase admin-sdk service account JSON file                  [required]
  --logsDir         logs location                                                  [default: "/tmp"]
  --throttle        throttle import requests in seconds                        [number] [default: 2]
  --limit           delete only first N accounts                               [number] [default: 0]
  --dryRun          just do a dry run and do NOT delete anything          [boolean] [default: false]
```

#### Required arguments

- serviceAccount - path to Firebase "service account" configuration JSON file. You can aquire this file from Firebase cosole. Please read [Initialize the SDK](https://firebase.google.com/docs/database/admin/start#initialize-sdk) for more instructions.

---

## Copyright

```
Copyright © 2020 Bunch. All rights reserved.
```
