"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.addTodo = exports.getTodos = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
let supabase = null;
const initializeSupabase = () => {
    if (!supabase) {
        const supabaseUrl = process.env.SUPABASE_URL;
        const supabaseKey = process.env.SUPABASE_KEY;
        if (!supabaseUrl || !supabaseKey) {
            throw new Error('SUPABASE_URL and SUPABASE_KEY must be defined in environment variables');
        }
        supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey);
    }
    return supabase;
};
const getTodos = async (req, res) => {
    const client = initializeSupabase();
    const { data, error } = await client.from('todos').select('*').order('date', { ascending: true });
    if (error)
        return res.status(500).json({ error: error.message });
    res.json(data);
};
exports.getTodos = getTodos;
const addTodo = async (req, res) => {
    const client = initializeSupabase();
    const todo = req.body;
    const { data, error } = await client.from('todos').insert([todo]).select();
    if (error)
        return res.status(500).json({ error: error.message });
    res.status(201).json(data[0]);
};
exports.addTodo = addTodo;
const updateTodo = async (req, res) => {
    const client = initializeSupabase();
    const { id } = req.params;
    const todo = req.body;
    const { data, error } = await client.from('todos').update(todo).eq('id', id).select();
    if (error)
        return res.status(500).json({ error: error.message });
    res.json(data[0]);
};
exports.updateTodo = updateTodo;
const deleteTodo = async (req, res) => {
    const client = initializeSupabase();
    const { id } = req.params;
    const { error } = await client.from('todos').delete().eq('id', id);
    if (error)
        return res.status(500).json({ error: error.message });
    res.json({ message: 'Todo deleted successfully' });
};
exports.deleteTodo = deleteTodo;
