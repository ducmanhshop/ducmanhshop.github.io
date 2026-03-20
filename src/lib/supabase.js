import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://nnbvimxsstagodpokwrq.supabase.co';
const SUPABASE_KEY = 'sb_publishable_DDc2MaH4RERkL8pQDAZXXg_02BVaNKV';

let supabaseClient = null;

try {
  supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);
} catch (e) {
  console.error("Lỗi khởi tạo Supabase SDK:", e);
}

export { supabaseClient };
