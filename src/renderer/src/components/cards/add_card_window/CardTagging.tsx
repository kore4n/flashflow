import React, { useEffect, useRef, useState } from 'react'
import { Tag, TagsInputProps } from 'src/types/types'
import { getAllTags } from '../CardsTable'
import AddTagWarnings from './AddTagWarnings'

const allTags = getAllTags()
const CardTagging: React.FC<TagsInputProps> = ({ tempTagPool, setTags }) => {
  const [inputValue, setInputValue] = useState<string>('')
  const [currentColor, setCurrentColor] = useState<string>('#00000033')
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const colorPickerRef = useRef<HTMLDivElement>(null)
  const colours = ['#111111', '#003794', '#16a4d8', '#60dbe8', '#8bd346', '#f9a52c', '#d64e12']

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const handleClickOutside = (event: MouseEvent) => {
      if (
        colorPickerRef.current &&
        !colorPickerRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowColorPicker(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value)
  }

  const addTag = async (tagText: string): Promise<void> => {
    const sanitizedText = tagText.trim().replace(/,/, '')
    if (sanitizedText.length == 0) {
      return
    }
    if (sanitizedText.length > 24) {
      // alert('Tag cannot exceed 24 characters')
      return
    }
    if (!sanitizedText.match(/^[A-Za-z0-9_+\-=().?!/ \\%$#@<>{}*&^–]+$/)) {
      // alert('Tag contains invalid characters')
      return
    }
    if (
      tempTagPool.some(
        (tag: { tagText: string }) => tag.tagText.toLowerCase() === sanitizedText.toLowerCase()
      )
    ) {
      // alert('Tag already exists')
      return
    }
    let newTagText: string = sanitizedText.toLowerCase()
    let newTagColour: string = currentColor.toUpperCase()
    if (sanitizedText.toLowerCase() in Object.keys(allTags)) {
      newTagText = sanitizedText.toLowerCase()
      newTagColour = allTags[newTagText]
    }
    const newTag: Tag = {
      tagText: newTagText,
      tagColor: newTagColour
    }
    setTags([...tempTagPool, newTag])
    setInputValue('')
  }

  const removeTag = (index: number): void => {
    const newTags = tempTagPool.filter((_, i) => i !== index)
    setTags(newTags)
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ',' || e.key === 'Enter') {
      addTag(inputValue)
      e.preventDefault()
    }
  }

  const handleColorSelect = (color: string): void => {
    setCurrentColor(color)
    setShowColorPicker(false)
    inputRef.current?.focus()
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleClick = () => {
    addTag(inputValue)
  }

  return (
    <div title="Click to Assign Tag" className=" mb-4">
      {tempTagPool.map((tag, index) => (
        <div
          key={index}
          style={{
            background: '#666666',
            color: '#ccc',
            display: 'inline-flex',
            alignItems: 'center',
            margin: '5px',
            padding: '5px 10px',
            borderRadius: '15px'
          }}
        >
          <span
            style={{
              backgroundColor: tag.tagColor,
              height: '10px',
              width: '10px',
              borderRadius: '50%',
              marginRight: '5px'
            }}
          ></span>
          {tag.tagText}
          <button
            onClick={() => removeTag(index)}
            style={{
              background: 'none',
              border: 'none',
              color: '#111',
              cursor: 'pointer',
              marginLeft: '10px'
            }}
          >
            <b> × </b>
          </button>
        </div>
      ))}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '5px',
          margin: '5px 0'
        }}
      >
        <span
          style={{
            backgroundColor: currentColor,
            height: '20px',
            width: '20px',
            borderRadius: '50%',
            margin: '0 10px 0 0'
          }}
        ></span>
        <input
          className="min-h-4 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          ref={inputRef}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowColorPicker(true)}
          style={{ flex: 1 }}
        />
      </div>
      {showColorPicker && (
        <div
          ref={colorPickerRef}
          style={{
            padding: '5px',
            borderRadius: '5px',
            display: 'flex',
            flexWrap: 'wrap',
            position: 'absolute',
            zIndex: 1000,
            backgroundColor: '#dddddd66',
            border: '0px solid #ddd',
            verticalAlign: 'middle',
            minWidth: '570px'
          }}
        >
          {colours.map((colour) => (
            <div
              key={colour}
              onClick={() => handleColorSelect(colour)}
              style={{
                backgroundColor: colour,
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                margin: '5px',
                cursor: 'pointer'
              }}
            ></div>
          ))}
          <div className="pl-2 pr-2 text-gray-200">
            <button
              className="hover:cursor-pointer hover:opacity-40"
              style={{
                backgroundColor: '#003794',
                color: 'white',
                padding: '2px 20px',
                borderRadius: '5px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 'bolder',
                margin: 'auto 18px auto 0px'
              }}
              onClick={handleClick}
            >
              ADD
            </button>
            Shortcut:{' '}
            <b>
              <i>Enter</i>
            </b>{' '}
            or comma ({' '}
            <b>
              <i>,</i>
            </b>{' '}
            )
          </div>
        </div>
      )}
      <div>
        <AddTagWarnings tagToInput={inputValue} tempTagPool={tempTagPool} />
      </div>
    </div>
  )
}

export default CardTagging
