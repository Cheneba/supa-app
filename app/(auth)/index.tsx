import { View, TextInput, Button, ListRenderItem, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { supabase } from '@/utils/supabase';
import { Ionicons } from '@expo/vector-icons';
import { Todo } from '@/utils/interfaces'
import AppleStyleSwipeableRow from '@/components/SwipeableRow';
const Index = () => {
  const [todo, setTodo] = useState('');
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    loadTodos();

  }, [])
  
  const addTodo = async () => {
    setLoading(true)
    const { data: { user: User } } = await supabase.auth.getUser();

    const newTodo = {
      user_id: User?.id,
      task: todo,
    }

    const result = await supabase.from('todos').insert(newTodo).select().single();
    console.log('todo task added')
    setLoading(false)
    setTodo('')
    setTodos([result.data, ...todos])
  }

  const loadTodos = async () => {
    const {
      data: todos, error
    } = await supabase.from('todos').select('*').order('inserted_at', { ascending: false })

    if (error) {
      console.log("Error: ", error);
    } else {
      console.log("Todos: ", todos);
      setTodos(todos)
    }
  }

  const updateTodo = async (todo: Todo) => {
    const result = await supabase.from('todos')
    .update({ is_complete: !todo.is_complete })
    .eq('id', todo.id)
    .select()
    .single();

    const update = todos.map((t) => (t.id === todo.id ? result.data : t));
    setTodos(update)
  };

  const deleteTodo = async (todo: Todo) => {
    await supabase.from('todos').delete().eq('id', todo.id);
    setTodos(todos.filter((t) => t.id !== todo.id));
  };

  const renderRow: ListRenderItem<Todo> = ({ item }) => {
    return (
      <AppleStyleSwipeableRow todo={item} onToggle={() => updateTodo(item)} onDelete={() => deleteTodo(item)}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
          <Text style={{ flex: 1 }}>{item.task}</Text>
          {item.is_complete && <Ionicons name="checkmark-done-outline" size={24} color="#151515" /> }
        </View>
      </AppleStyleSwipeableRow>
    )
  }

  return (
    <View style={{flex: 1}}>
      <View style={{ flexDirection: 'row' }}>
        <TextInput
          placeholder='Add a todo'
          value={todo}
          onChangeText={setTodo}
          style={{
            flex: 1,
            backgroundColor: '#363636',
            color: '#fff',
            padding: 8,
            borderWidth: 1,
            borderColor: '#2b825b',
            borderRadius: 4
          }}
        />
        <Button title="Add" color={'#2b825b'} onPress={addTodo} disabled={loading || todo === ''}
        ></Button>
      </View>
      
      <FlatList data={todos} renderItem={renderRow} />
    </View>

  )
}

export default Index