import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://yqekvomnoeinvrbztvhx.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMjU0NzEwMCwiZXhwIjoxOTM4MTIzMTAwfQ.gzi0DIXR1HTjZb7x3smUS3us1SdwVzqZwAmuZlgd_wc'; // process.env.SUPABASE_KEY
export const supabase = createClient(supabaseUrl, supabaseKey)
