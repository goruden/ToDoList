# Supabase Table Setup Instructions

## Create the `todos` Table

1. Go to your Supabase dashboard: https://supabase.com/dashboard
2. Select your project
3. Navigate to **Table Editor** in the sidebar
4. Click **Create a new table**
5. Set up the table with the following configuration:

### Table Settings
- **Name**: `todos`
- **Enable Row Level Security**: Unchecked (for now)

### Columns
| Name | Type | Default | Constraints |
|------|------|---------|-------------|
| `id` | `uuid` | `gen_random_uuid()` | Primary Key |
| `title` | `text` | - | Not Null |
| `description` | `text` | - | - |
| `date` | `timestamptz` | `now()` | - |
| `status` | `text` | `'remaining'` | - |

### SQL Command (Alternative)
You can also run this SQL in the Supabase SQL Editor:

```sql
CREATE TABLE todos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  date TIMESTAMPTZ DEFAULT now(),
  status TEXT DEFAULT 'remaining'
);
```

## After Creating the Table

1. The 500 errors should disappear
2. Your todo app will be fully functional
3. Mock data will be replaced with real data from Supabase

## Current App Status

The app now has mock data fallback, so it works during development even without the database. Once you create the table, it will automatically switch to using real data.
