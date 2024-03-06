import React, { useState } from 'react';
import '../index.css';

function TagInput({customInputClass, customTagClass}) {
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const addTag = (value) => {
    let splitTags = value.split(',');
    let newTags = [];
    let lastTag = tags[tags.length - 1];
    let lastId = 0;
    if (lastTag?.id) {
      lastId = lastTag?.id;
    }
    splitTags.forEach((tag) => {
      if(tag.length > 0){
        lastId++;
        let newTagObject = {
          id: lastId,
          name: tag.trim(),
        };
        newTags.push(newTagObject);
      }
    });
    setTags([...tags, ...newTags]);
    setInputValue(''); // Clear input after adding tag
  };

  const showTags = () => {
    console.log(tags);
  };

  const removeTag = (id) => {
    const newTags = tags.filter((tag) => tag.id !== id);
    setTags(newTags);
  };

  

  return (
    <div className="container mt-4">
      <div>
        <input
          type="text"
          name="input"
          className={`${customInputClass ? customInputClass : 'form-control px-3 py-2 border rounded-md w-full focus:outline-none focus:border-blue-500'}`}
          placeholder=""
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              addTag(inputValue);
            }
          }}
        />
        <small className="text-xs text-gray-600">
          You can Separate tags with a comma. Press enter key to add
        </small>
      </div>

      <div
        className="flex gap-2"
        style={{
          maxWidth: '100%',
          overflowX: 'auto',
          whiteSpace: 'nowrap',
        }}
      >
        {tags &&
          tags?.map((tag) => {
            return (
              <div
                className={`${customTagClass ? customTagClass : "flex justify-between bg-blue-600 text-white rounded-sm px-2"}`}
                style={{ minWidth: 'auto' }}
                key={tag?.id}
              >
                <span>{tag?.name}</span>
                <span
                  className="flex flex-col justify-center pl-2 cursor-pointer"
                  onClick={() => removeTag(tag?.id)}
                >
                  <svg
                    viewBox="0 0 10 10"
                    width="0.75em"
                    height="0.75em"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M1,1 9,9 M9,1 1,9" />
                  </svg>
                </span>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default TagInput;
