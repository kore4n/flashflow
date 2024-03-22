import React, { useEffect, useRef, useState } from 'react'
import { Tag, TagsInputProps } from 'src/types/types'

const CardTagging: React.FC<TagsInputProps> = ({ tempTagPool, setTags }) => {
  const [inputValue, setInputValue] = useState<string>('')
  const [currentColor, setCurrentColor] = useState<string>('#000000')
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const colorPickerRef = useRef<HTMLDivElement>(null)
  const colours = [
    '#000000',
    '#FF5733',
    '#33FF57',
    '#3357FF',
    '#F333FF',
    '#33FFF3',
    '#F3FF33',
    '#FF33F3'
  ]

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

  const addTag = (tagText: string): void => {
    const sanitizedText = tagText.trim().replace(/,/, '')
    if (sanitizedText.length == 0) {
      return
    }
    if (sanitizedText.length > 24) {
      alert('Tag cannot exceed 24 characters')
      return
    }
    if (!sanitizedText.match(/^[A-Za-z0-9_+\-=().?!/ \\%$#@<>{}*&^–]+$/)) {
      alert('Tag contains invalid characters')
      return
    }
    if (
      tempTagPool.some(
        (tag: { tagText: string }) => tag.tagText.toLowerCase() === sanitizedText.toLowerCase()
      )
    ) {
      alert('Tag already exists')
      return
    }
    const newTag: Tag = {
      tagText: sanitizedText.toLowerCase(),
      tagColor: currentColor.toUpperCase()
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

  return (
    <div>
      {tempTagPool.map((tag, index) => (
        <div
          key={index}
          style={{
            background: '#666',
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
            backgroundColor: '#dddddd99',
            border: '0px solid #ddd'
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
        </div>
      )}
    </div>
  )
}

export default CardTagging
