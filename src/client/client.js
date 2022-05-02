import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://xqssbnkxqzhoaztiqgxo.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhxc3Nibmt4cXpob2F6dGlxZ3hvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTEzMjk3MjgsImV4cCI6MTk2NjkwNTcyOH0.phxCpEhsm7EVsIGlFGv72Uft3C0N1lZSreIDkK00sqY')
export {
    supabase
}