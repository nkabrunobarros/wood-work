/* eslint-disable react/react-in-jsx-scope */
import { useState, useCallback, useMemo, useRef } from 'react';
import Content from '../content/content';
import '@draft-js-plugins/mention/lib/plugin.css';
import { EditorState } from 'draft-js';
import Editor from '@draft-js-plugins/editor';
import createMentionPlugin, {
  defaultSuggestionsFilter,
} from '@draft-js-plugins/mention';
import mentions from './Mentions';
const test = () => {
  const ref = useRef('');
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [open, setOpen] = useState(true);
  const [suggestions, setSuggestions] = useState(mentions);

  const { MentionSuggestions, plugins } = useMemo(() => {
    const mentionPlugin = createMentionPlugin();
    // eslint-disable-next-line no-shadow
    const { MentionSuggestions } = mentionPlugin;
    // eslint-disable-next-line no-shadow
    const plugins = [mentionPlugin];
    return { plugins, MentionSuggestions };
  }, []);

  const onOpenChange = useCallback((_open) => {
    setOpen(_open);
  }, []);
  const onSearchChange = useCallback(({ value }) => {
    setSuggestions(defaultSuggestionsFilter(value, mentions));
  }, []);
  console.log()
  return (
    <Content>
      <div
        className='editors'
        onClick={() => {
          ref.current.focus();
        }}
        style={{ border: '1px solid var(--grayEdges)',
        borderRadius: '4px',
        padding: '2rem 2rem 2rem 2rem'
        , width: '50%',
        
    }}
      >
        <Editor
          editorKey={'editor'}
          editorState={editorState}
          onChange={setEditorState}
          plugins={plugins}
          ref={ref}
          
        />
        <MentionSuggestions
          open={open}
          onOpenChange={onOpenChange}
          suggestions={suggestions}
          onSearchChange={onSearchChange}
          onAddMention={() => {
            console.log('mention');
            // get the mention object selected
          }}
        />
      </div>
    </Content>
  );
};

export default test;
