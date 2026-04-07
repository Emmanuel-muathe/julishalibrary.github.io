# Papers Data API

`papersData` is the canonical dataset used by the UI and validation tooling.

## Source of truth

- Browser/runtime source: `js/papers-data.js`
- Runtime validator: `js/script.js`
- CI/automation validator: `scripts/validate-papers-data.js`

## Schema: `PaperRecord`

### Required fields

| Field | Type | Notes |
| --- | --- | --- |
| `id` | number | Must be unique across all records. |
| `title` | string | Human-readable paper title. |
| `subject` | string | Subject name shown in tags and search. |
| `level` | string | Class/form level (for example, `Form 1`). |
| `description` | string | Short summary shown in cards and preview. |
| `author` | string | Publisher/author label. |
| `year` | number | Publication year metadata. |
| `downloads` | number | Download count (UI metric). |
| `rating` | number | Rating value (UI metric). |
| `pages` | number | Page count shown in preview. |
| `difficulty` | string | Display label such as `Easy`, `Medium`, `Hard`. |
| `pdfUrl` | string | Relative path to local PDF file, must exist on disk. |

### Optional fields

| Field | Type | Notes |
| --- | --- | --- |
| `url` | string | Optional external/reference URL. Not required by UI. |

## Validation rules

1. Every record must contain all required fields.
2. `id` values must be unique.
3. `pdfUrl` must point to an existing file.
4. Object literals should not contain duplicate keys.

## Validation command

```bash
npm run validate:papers
```

This command is used by CI and can also be used in a local pre-commit hook.
