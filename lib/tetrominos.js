/**
 * Tetrominos will be represented as 16-bit binary numbers, with each
 * bit representing a position on a 4x4 square grid:
 *  0  1  2  3
 *  4  5  6  7
 *  8  9 10 11
 * 12 13 14 15
 *
 * The o piece, for example, takes up sites 0, 1, 4, and 5, and can
 * therefore be represented by the binary number 0b1100 1100 0000 0000.
 *
 * In this way all of the pieces and all of their rotations can be
 * represented with very litte overhead. Additionally, this allows for
 * fast bit-level operations when iterating over all blocks in the game
 * grid.
 */

// access n-th rotation of piece with o.rotations[n]
export const o = {
  rotations: [
    0b1100110000000000,
    0b1100110000000000,
    0b1100110000000000,
    0b1100110000000000
  ],
  string: 'O',
  color: 'rgb(255, 255, 0)'
};

export const i = {
  rotations: [
    0b0100010001000100,
    0b0000111100000000,
    0b0010001000100010,
    0b0000000011110000,
  ],
  string: 'I',
  color: 'rgb(0, 231, 233)'
};

export const t = {
  rotations: [
    0b0000111001000000,
    0b0100110001000000,
    0b0100111000000000,
    0b0100011001000000
  ],
  string: 'T',
  color: 'rgb(255, 0, 255)'
};

export const l = {
  rotations: [
    0b0100010001100000,
    0b0000111010000000,
    0b1100010001000000,
    0b0010111000000000
  ],
  string: 'L',
  color: 'rgb(255, 128, 0)'
};

export const j = {
  rotations: [
    0b0100010011000000,
    0b1000111000000000,
    0b0110010001000000,
    0b0000111000100000
  ],
  string: 'J',
  color: 'rgb(0, 0, 255)'
};

export const s = {
  rotations: [
    0b0110110000000000,
    0b0100011000100000,
    0b0000011011000000,
    0b1000110001000000
  ],
  string: 'S',
  color: 'rgb(0, 255, 0)'
};

export const z = {
  rotations: [
    0b1100011000000000,
    0b0010011001000000,
    0b0000110001100000,
    0b0100110010000000
  ],
  string: 'Z',
  color: 'rgb(255, 0, 0)'
};

// for battle tetris - the unclearable brick
export const brick = {
  rotations: [
    0b1000000000000000,
    0b1000000000000000,
    0b1000000000000000,
    0b1000000000000000
  ],
  string: '#',
  color: 'gray'
};
